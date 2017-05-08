<?php
/**
 * Created by PhpStorm.
 * User: ihsen
 * Date: 10/02/17
 * Time: 15:12
 */
namespace ContinuousNet\UbidElectricityBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\Query;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Routing\RequestContext;

class SendAlertCommand extends ContainerAwareCommand
{

    protected function configure() {
        $this
            ->setName('app:send-notification')
            ->addArgument('value', InputArgument::OPTIONAL, '')
            ->addOption('period', null, InputOption::VALUE_NONE, '');
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $response = null;
        $periods = ['daily', 'weekly', 'monthly'];
        if ($input->getOption('period')) {
            $period = $input->getArgument('value');
            if (in_array(strtolower($period), $periods)) {
                //play the game
            } else {
                //output error
            }
            $alerts = $this->getAlertsByPeriod(strtolower($period));
            if ($alerts) {
                $usersAlerts = [];
                foreach ($alerts as $alert) {
                    $usersAlerts[$alert->getCreatorUser()->getEmail()][$alert->getId()] = $alert->getTypes();
                }
                foreach ($usersAlerts as $email => $alerts) {  //list alerts by user
                    $tenders = [];
                    $buyers = [];
                    $suppliers = [];
                    $consultations = [];
                    foreach ($alerts as $alert => $types) {
                        $countriesByAlert = $this->getCountriesByAlert($alert);
                        $categoriesByAlert = $this->getCategoriesByAlert($alert);
                        foreach ($types as $type) {
                            $listOfType = $this->getType($type, $period, $countriesByAlert, $categoriesByAlert);
                            foreach ($listOfType as $itemOfType) {
                                if ($type == 'Tender' || $type == 'Consultation') {
                                    if (!in_array($itemOfType->getId(), $consultations)) {
                                        $consultations[$itemOfType->getId()] = $itemOfType->getTitle();
                                    }
                                } else if ($type == 'Buyer' || $type == 'Supplier') {
                                    if (!in_array($itemOfType->getId(), $suppliers)) {
                                        $suppliers[$itemOfType->getId()] = $itemOfType->getName();
                                    }
                                }
                            }
                        }
                    }
                    $this->sendEmail($email, $tenders, $consultations, $buyers, $suppliers);
                }
            }
        }
    }

    private function getCountriesByAlert($idAlert) {
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert','a_');
        $qb->select('a_');
        $qb->where('a_.id = :alert_id')->setParameter('alert_id', $idAlert);
        $results = $qb->getQuery()->getOneOrNullResult();
        $countries = $results->getCountries();
        $IdCountries= [];
        foreach ($countries as $country) {
            array_push($IdCountries ,$country->getID());
        }
        return $IdCountries;
    }

    private function getCategoriesByAlert($idAlert) {
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert','a_');
        $qb->select('a_');
        $qb->where('a_.id = :alert_id')->setParameter('alert_id', $idAlert);
        $results = $qb->getQuery()->getOneOrNullResult();
        $categories = $results->getCategories();
        $IdCategories= [];
        foreach ($categories as $category) {
            array_push($IdCategories ,$category->getID());
        }
        return $IdCategories;
    }

    private function getType($type , $period, $countries, $categories) {
        $currentDay = date('Y-m-d h:i:s');
        if ($period == 'daily') {
            $dateCompare = date('Y-m-d h:i:s', strtotime($currentDay . ' -1 days'));
        } else if ($period == 'weekly') {
            $dateCompare = date('Y-m-d h:i:s', strtotime($currentDay . ' -1 weeks'));
        } else if ($period == 'monthly') {
            $dateCompare = date('Y-m-d h:i:s', strtotime($currentDay . ' -1 months'));
        }
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        if ($type == 'Tender' || $type == 'Consultation') {
            $qb->from('UbidElectricityBundle:Tender', 't_');
            $qb->andWhere('t.validated = 1');
            $qb->andwhere('t_.status = :status')->setParameters(array('status' => 'Online'));
            $qb->andwhere('t_.section = :section')->setParameter('section', $type);
        } else if ($type == 'Buyer' || $type == 'Supplier') {
            $qb->from('UbidElectricityBundle:'.$type, 't_');
            $qb->andWhere('t.isPublic = 1');
        }
        $qb->andwhere('t_.createdAt >= :period')->setParameter('period', $dateCompare);
        $qb->andwhere('t_.country IN (:idsCountries)')->setParameter('idsCountries', $countries);
        $qb->andwhere(':idsCategories MEMBER OF t_.categories')->setParameter('idsCategories', $categories);
        $qb->select('t_');
        $results = $qb->getQuery()->getResult();
        return $results;
    }

    private function getAlertsByPeriod($period) {
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert', 'a_');
        $qb->where('a_.status = :status')->setParameter('status', 'Active');
        $qb->where('a_.period = :period')->setParameter('period', $period);
        $qb->select('a_');
        $qb->groupBy('a_.creatorUser','a_.id');
        $results = $qb->getQuery()->getResult();
        if ($results == null) {
            return false;
        } else {
            return $results;
        }
    }

    private function getFirstNameFromEmail($email) {
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:User', 'u_');
        $qb->where('u_.email = :email')->setParameter('email', $email);
        $qb->select('u_.firstName');
        $result = $qb->getQuery()->getSingleScalarResult();
        if ($result == null) {
            return false;
        } else {
            return $result;
        }
    }

    private function sendEmail($to, $tenders, $consultations, $buyers, $suppliers) {
        $mailer = $this->getContainer()->get('mailer');
        $translator = $this->getContainer()->get('translator');
        $templating = $this->getContainer()->get('templating');

        $fistName = $this->getFirstNameFromEmail($to);
        $baseUrl = $this->getContainer()->get('templating.helper.assets')->getUrl('');

        $subject = $translator->trans('email.alert.subject');
        $body = $templating->render('UbidElectricityBundle:Emails:alert.html.twig',
            array(
                'fistName' => $fistName,
                'tenders' => $tenders,
                'consultations' => $consultations,
                'buyers' => $buyers,
                'suppliers' => $suppliers,
                'baseUrl' => $baseUrl
            )
        );

        $message = \Swift_Message::newInstance();
        $message
            ->setTo($to)
            ->setSubject($subject)
            ->setBody($body, 'text/html');
         $mailer->send($message);
    }
}