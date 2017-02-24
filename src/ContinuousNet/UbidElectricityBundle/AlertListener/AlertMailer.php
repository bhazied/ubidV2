<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use ContinuousNet\UbidElectricityBundle\Entity\Message;
use ContinuousNet\UbidElectricityBundle\Entity\User;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Templating\EngineInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * AlertMailer
 *
 * @author Zied Ben Hadj Amor
 */
class AlertMailer
{

    private $mailer;
    private $templating;
    //private $router;
    protected  $container;
    private  $from;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->mailer = $this->container->get('mailer');
        $this->from = $this->container->getParameter('email_contact');
    }


    public function __call($name, $arguments)
    {
        $this->templating = $this->container->get('templating');
       if($name == "new_message"){
           $template = 'UbidElectricityBundle:Emails:new_message.html.twig';
           $body = $this->templating->render($template, array('message' => $arguments[0]));
           $subject = "[RCEIVED A NEW MESSAGE]";

           $this->sendMail($arguments[1], $subject, $body);
       }
        if ($name == "new_bid"){
            $template = 'UbidElectricityBundle:Emails:new_bid_received.html.twig';
            $body = $this->templating->render($template, array('bid' => $arguments[0]));
            $subject = "[YOUR BID IS SHORTLISTED]";
        }
        if($name == "load_tender"){
            $template = 'UbidElectricityBundle:Emails:consult_tender.html.twig';
            $body = $this->templating->render($template, array('tender' => $arguments[0]));
            $subject = "[SOMEONE CONSULT YOUR OPPORTUNITY BUSINESS]";
            $this->sendMail($arguments[1], $subject, $body);
        }
        if($name == "load_profile"){
            
        }
        if($name == "update_bid"){
            $template = 'UbidElectricityBundle:Emails:bid_short_listed.html.twig';
            $body = $this->templating->render($template, array('bid' => $arguments[0]));
            $subject = "[YOUR BID SHORLISTED]";
            $this->sendMail($arguments[1], $subject, $body);
        }

    }

    protected function sendMail($to, $subject, $body){
        $message = \Swift_Message::newInstance();
        $message->setFrom($this->from)
            ->setTo($to)
            ->setSubject($subject)
            ->setBody($body)
            ->setContentType('text/html');
        $this->mailer->send($message);

    }
    
}