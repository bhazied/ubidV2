<?php

namespace ContinuousNet\UbidElectricityBundle\Form;

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
 * Message Type
 * 
 * Render Message Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\UbidElectricityBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://ubidelectricity.continuousnet.com/ContinuousNet\UbidElectricityBundle/Form
 * @see        MessageType
 * @since      Class available since Release 1.0
 * @access     public
 */
class MessageType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('fromUser', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:User', 'choice_label' => 'username'))
            ->add('fromBuyer', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Buyer', 'choice_label' => 'name'))
            ->add('fromSupplier', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Supplier', 'choice_label' => 'name'))
            ->add('toUser', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:User', 'choice_label' => 'username'))
            ->add('toBuyer', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Buyer', 'choice_label' => 'name'))
            ->add('toSupplier', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Supplier', 'choice_label' => 'name'))
            ->add('subject', TextType::class)
            ->add('body', TextareaType::class)
            ->add('status', ChoiceType::class, array('choices' => array('Draft' => 'Draft', 'Sent' => 'Sent', ), 'expanded' => false, 'multiple' => false))
            ->add('isRead', CheckboxType::class)
            ->add('sendingTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('readingTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\Message'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_Message';
    }
}