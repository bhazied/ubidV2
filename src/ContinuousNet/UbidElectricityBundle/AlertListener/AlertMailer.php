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
class AlertMailer  {

    protected $container;
    private $mailer;
    private $translator;
    private $templating;
    private $from;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
        $this->mailer = $this->container->get('mailer');
        $this->translator = $this->container->get('translator');
        $this->from = $this->container->getParameter('email_contact');
    }

    public function __call($method, $arguments) {
        $this->templating = $this->container->get('templating');
        if ($method == 'new_message') {
           $template = 'UbidElectricityBundle:Emails:new_message.html.twig';
           $body = $this->templating->render($template, array('message' => $arguments[0]));
           $subject = $this->translator->trans('email.new_message.subject');
           $this->sendMail($arguments[1], $subject, $body);
        } else if ($method == 'new_bid') {
            $template = 'UbidElectricityBundle:Emails:new_bid_received.html.twig';
            $body = $this->templating->render($template, array('bid' => $arguments[0]));
            $subject = $this->translator->trans('email.new_bid_received.subject');
            $this->sendMail($arguments[1], $subject, $body);
        } else if ($method == 'load_tender') {
            $template = 'UbidElectricityBundle:Emails:consult_tender.html.twig';
            $body = $this->templating->render($template, array('tender' => $arguments[0]));
            $subject = $this->translator->trans('email.consult_tender.subject');
            $this->sendMail($arguments[1], $subject, $body);
        } else if ($method == 'load_buyer') {
            $template = 'UbidElectricityBundle:Emails:consult_profile_buyer.html.twig';
            $body = $this->templating->render($template, array('buyer' => $arguments[0]));
            $subject = $this->translator->trans('email.consult_profile_buyer.subject');
            $this->sendMail($arguments[1], $subject, $body);
        } else if ($method == 'load_supplier') {
            $template = 'UbidElectricityBundle:Emails:consult_profile_supplier.html.twig';
            $body = $this->templating->render($template, array('supplier' => $arguments[0]));
            $subject = $this->translator->trans('email.consult_profile_supplier.subject');
            $this->sendMail($arguments[1], $subject, $body);
        } else if ($method == 'update_bid') {
            $template = 'UbidElectricityBundle:Emails:bid_short_listed.html.twig';
            $body = $this->templating->render($template, array('bid' => $arguments[0]));
            $subject = $this->translator->trans('email.bid_short_listed.subject');
            $this->sendMail($arguments[1], $subject, $body);
        }
    }

    protected function sendMail($to, $subject, $body) {
        $message = \Swift_Message::newInstance();
        $message->setFrom($this->from)
            ->setTo($to)
            ->setSubject($subject)
            ->setBody($body)
            ->setContentType('text/html');
        $this->mailer->send($message);
    }
    
}