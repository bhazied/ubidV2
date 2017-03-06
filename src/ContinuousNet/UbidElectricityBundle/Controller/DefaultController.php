<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template("UbidElectricityBundle:Default:index.html.twig")
     */
    public function indexAction()
    {
        // replace this example code with whatever you need
        return $this->render('UbidElectricityBundle:Default:index.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/")
     * @Template("UbidElectricityBundle:Default:public.html.twig")
     */
    public function publicAction() {

        $slug = 'home';

        $em = $this->getDoctrine()->getManager();
        $qb = $em->createQueryBuilder();
        $qb->from('UbidElectricityBundle:Post', 'p_');
        $qb->select('p_');
        $qb->andWhere('p_.slug = :slug')->setParameter('slug', $slug);
        $qb->setMaxResults(1);
        $post = $qb->getQuery()->getOneOrNullResult();

        //$data = $this->translateEntity($data);

        return $this->render('UbidElectricityBundle:Default:public.html.twig', array(
            'post' => $post,
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/", host="chart.ubid.com")
     * @Template("UbidElectricityBundle:Default:chart.html.twig")
     */
    public function chartAction() {
        return $this->render('UbidElectricityBundle:Default:chart.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }
}