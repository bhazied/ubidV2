<?php
/**
 * Created by PhpStorm.
 * User: ihsen
 * Date: 10/02/17
 * Time: 15:12
 */
namespace ContinuousNet\UbidElectricityBundle\Command;

use ContinuousNet\UbidElectricityBundle\Entity\User;
use ContinuousNet\UbidElectricityBundle\Entity\Buyer;
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

    protected function configure()
    {
        $this
            ->setName('app:send-notification')
            ->addArgument('value', InputArgument::OPTIONAL, 'Qui voulez vous saluer??')
            ->addOption('period', null, InputOption::VALUE_NONE, '')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $response = null;
        $periods = ['daily', 'weekly', 'monthly'];

        if ($input->getOption('period')) {
            $period = $input->getArgument('value');
            if (in_array(strtolower($period), $periods)){
                //play the game
            }
            else{
                //output error
            }
            $alerts = $this->getAlertsbyPeriod(strtolower($period));
            $dataPrespared = [];
            $data = [];

            if($alerts){
                //print_r($alerts);
                foreach ($alerts as $alert){
                    /*if(isset($dataPrespared[$alert->getCreatorUser()->getId()])){
                       // $dataPrespared[$alert->getCreatorUser()->getId()] = array($alert->getId());
                        array_push($dataPrespared[$alert->getCreatorUser()->getId()], $alert->getId());
                    }*/
                    $dataPrespared[$alert->getCreatorUser()->getEmail()][$alert->getId()]= $alert->getTypes();
                }
                //print_r($dataPrespared);die;
                foreach ($dataPrespared as $creatorUser =>$alerts){  //list alerts by user
                    $infoTender=[];
                    $infoBuyer=[];
                    $infoSupplier=[];
                    $infoConsultation = [];
                    foreach ($alerts as $alert =>$types){  //list  types by alert for only user
                        $countriesByAlert = $this->getCountriesByAlert($alert);
                        $categoriesByAlert = $this->getCategoriesByAlert($alert);
                        foreach ($types as $type){  //list value for one types
                            $listOfType = $this->getType($type, $period, $countriesByAlert, $categoriesByAlert);
                            foreach ($listOfType as $list){
                                if($type == "Tender"){
                                    if(!in_array($list->getId(),$infoTender)){
                                        //array_push($infoTender , $list->getId());
                                        $infoTender[$list->getId()]=$list->getTitle();
                                    }
                                }
                                if($type == "SupplierProduct"){
                                    if(!in_array($list->getId(),$infoConsultation)){
                                        //array_push($infoConsultation , $list->getId());
                                        $infoConsultation[$list->getId()]=$list->getTitle();
                                    }
                                }
                                if($type == "Buyer"){
                                    if(!in_array($list->getId(),$infoBuyer)){
                                        //array_push($infoBuyer , $list->getName());
                                        $infoBuyer[$list->getId()]=$list->getName();
                                    }
                                }
                                if($type == "Supplier"){
                                    if(!in_array($list->getId(),$infoSupplier)){
                                        //array_push($infoSupplier , $list->getName());
                                        $infoSupplier[$list->getId()]=$list->getName();
                                    }
                                }
                            }
                        }
                    }//print_r($infoConsultation);die;
                   $this->sendEmail($creatorUser ,$infoTender, $infoConsultation, $infoBuyer,$infoSupplier);
                }

            }
        }
    }
    private function getCountriesByAlert($idAlert){
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert','a_');
        $qb->select('a_');
        $qb->where('a_.id = :alert_id')->setParameter('alert_id', $idAlert);
        $results = $qb->getQuery()->getOneOrNullResult();
        $countries = $results->getCountries();
        $IdCountries= [];
        foreach ($countries as $country){
            array_push($IdCountries ,$country->getID());
        }

        return $IdCountries;
    }
    private function getCategoriesByAlert($idAlert){
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert','a_');
        $qb->select('a_');
        $qb->where('a_.id = :alert_id')->setParameter('alert_id', $idAlert);
        $results = $qb->getQuery()->getOneOrNullResult();
        $categories = $results->getCategories();
        $IdCategories= [];
        foreach ($categories as $category){
            array_push($IdCategories ,$category->getID());
        }
        return $IdCategories;
    }


    private function getType($type , $period, $countries, $categories){
        //print_r($categories);
        $currentDay =date("Y-m-d h:i:s");
        if($period=="daily"){
            $dateCompare = date("Y-m-d h:i:s" , strtotime($currentDay . ' -1 day'));
        }
        if($period=="weekly"){
            $dateCompare = date("Y-m-d h:i:s" , strtotime($currentDay . ' -1 week'));
        }
        if($period=="monthly"){
            $dateCompare = date("Y-m-d h:i:s" , strtotime($currentDay . ' -1 months'));
        }

        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        if($type == "SupplierProduct"){
            $qb->from('UbidElectricityBundle:Tender', 't_');
        }else{
            $qb->from('UbidElectricityBundle:'.$type, 't_');
        }
        $qb->where('t_.createdAt > :period')->setParameter('period', $dateCompare);
        if($type == "Tender")$qb->andwhere('t_.section = :section')->setParameter('section', "Tender");
        if($type == "SupplierProduct")$qb->andwhere('t_.section = :section')->setParameter('section', "Consultation");
        $qb->andwhere('t_.country IN (:idsCountries)')->setParameter('idsCountries', $countries);
        if($type == "Tender" || $type == "SupplierProduct"){
            $qb->andwhere(':idsCategories MEMBER OF t_.categories')->setParameter('idsCategories', $categories);
        }
        $qb->select('t_');
        $results = $qb->getQuery()->getResult();
        return $results;
    }


    private function getAlertsbyPeriod($period){
        $em = $this->getContainer()->get('doctrine')->getEntityManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Alert', 'a_');
        $qb->where('a_.period = :period')->setParameter('period', $period);
        $qb->select('a_');
        //$qb->orderBy('a_.id', 'ASC');
        $qb->groupBy('a_.creatorUser','a_.id');
        $results = $qb->getQuery()->getResult();
        if ($results == null) {
            return false;
        }
        else{
            return $results;
        }
    }


    private function sendEmail($creatorUser ,$infoTender, $infoConsultation, $infoBuyer,$infoSupplier){
        //print_r($infoTender);die;
        $mailer = $this->getContainer()->get('mailer');
        $message = \Swift_Message::newInstance();
        $baseUrl = $this->getContainer()->get('templating.helper.assets')->getUrl('');
        $logo = $message->embed(\Swift_Image::fromPath($baseUrl.'/front/img/e-electricity-logo.png'));
        $phone = $message->embed(\Swift_Image::fromPath($baseUrl.'/front/img/phone.ico'));
        $mail = $message->embed(\Swift_Image::fromPath($baseUrl.'/front/img/mail.ico'));
        $message->setSubject('New Alert')
            ->setFrom('contact@continuousnet.com')
            ->setTo($creatorUser)
            ->setBody($this->getContainer()->get('templating')->render('UbidElectricityBundle:Alert:email.html.twig',
                array('Tenders' => $infoTender,
                    'Consultations' => $infoConsultation,
                    'Buyers'=>$infoBuyer,
                    'Suppliers' => $infoSupplier,
                    'logo'=>$logo,
                    'phone'=>$phone,
                    'mail'=>$mail,
                    'baseUrl'=>$baseUrl)), "text/html");
        $mailer->send($message);
    }
}