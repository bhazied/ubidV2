<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/", host="ubid.com")
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
    public function publicAction(){
        return $this->render('UbidElectricityBundle:Default:public.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/", host="chart.ubid.com")
     * @Template("UbidElectricityBundle:Default:chart.html.twig")
     */
    public function chartAction(){
        return $this->render('UbidElectricityBundle:Default:chart.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }
}