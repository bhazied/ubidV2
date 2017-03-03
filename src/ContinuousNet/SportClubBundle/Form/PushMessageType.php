<?php

namespace ContinuousNet\SportClubBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

/**
 * Push Message Type
 * 
 * Render Push Message Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\SportClubBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet\SportClubBundle/Form
 * @see        PushMessageType
 * @since      Class available since Release 1.0
 * @access     public
 */
class PushMessageType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pushDevice', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:PushDevice', 'choice_label' => 'appName'))
            ->add('pushNotification', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:PushNotification', 'choice_label' => 'title'))
            ->add('delivery', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('languageCode', TextType::class)
            ->add('sendingStatus', ChoiceType::class, array('choices' => array('Initialized' => 'Initialized', 'Queued' => 'Queued', 'Delivered' => 'Delivered', 'Failed' => 'Failed', ), 'expanded' => false, 'multiple' => false))
            ->add('response', TextType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\SportClubBundle\Entity\PushMessage'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'SportClubBundle_PushMessage';
    }
}