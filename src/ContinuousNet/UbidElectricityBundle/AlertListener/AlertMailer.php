<?php

namespace ContinuousNet\UbidElectricityBundle\AlertListener;

use ContinuousNet\UbidElectricityBundle\Entity\Message;
use FOS\UserBundle\Entity\User;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Templating\EngineInterface;

/**
 * AlertMailer
 *
 * @author Zied Ben Hadj Amor
 */
class AlertMailer
{
    
    protected $mailer;
    protected $templating;
    protected  $from;

    function __construct(\Swift_Mailer $_mailer, EngineInterface $_templating)
    {
        $this->mailer = $_mailer;
        $this->templating = $_templating;
        $this->from = 'contact@ubid.com';
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


    public function sendNewBidEmail(User $user, Bid $bid){
        $template = 'UbidElectricityBundle:EMAILS:bidShortListes.html.twig';
        $body = $this->templating->render($template, array('newBid' => $bid));
        $to = $user->getEmail();
        $subject = '[New Bid Added]';
        $this->sendMail($to, $subject, $body);
    }

    public function sendViewProfileEmail(User $user, User $visitor){
        $template = 'UbidElectricityBundle:EMAILS:bidShortListes.html.twig';
        $body = $this->templating->render($template, array('newBid' => $visitor));
        $to = $user->getEmail();
        $subject = '[New Bid Added]';
        $this->sendMail($to, $subject, $body);
    }

    public function sendShortListBidEmail(User $user, Bid $bid){
        $template = 'UbidElectricityBundle:EMAILS:bidShortListes.html.twig';
        $body = $this->templating->render($template, array('shortList' => $bid));
        $to = $user->getEmail();
        $subject = '[New Bid Added]';
        $this->sendMail($to, $subject, $body);
    }

    public function sendNewMessageEmail(User $user, Message $message){
        $template = 'UbidElectricityBundle:EMAILS:bidShortListes.html.twig';
        $body = $this->templating->render($template, array('message' => $message));
        $to = $user->getEmail();
        $subject = '[New Bid Added]';
        $this->sendMail($to, $subject, $body);
    }

    public function sendConsultTenderEmail(User $user, Tender $tender){
        $template = 'UbidElectricityBundle:EMAILS:bidShortListes.html.twig';
        $body = $this->templating->render($template, array('tender' => $tender));
        $to = $user->getEmail();
        $subject = '[New Bid Added]';
        $this->sendMail($to, $subject, $body);

    }
}