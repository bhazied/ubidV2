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
 * Push Device Type
 * 
 * Render Push Device Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\SportClubBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet\SportClubBundle/Form
 * @see        PushDeviceType
 * @since      Class available since Release 1.0
 * @access     public
 */
class PushDeviceType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('appName', TextType::class)
            ->add('appVersion', TextType::class)
            ->add('deviceUid', TextType::class)
            ->add('deviceReg', TextType::class)
            ->add('deviceToken', TextType::class)
            ->add('deviceName', TextType::class)
            ->add('deviceEmail', TextType::class)
            ->add('deviceModel', TextType::class)
            ->add('deviceVersion', TextType::class)
            ->add('isEnabledBadge', CheckboxType::class)
            ->add('isEnabledAlert', CheckboxType::class)
            ->add('isEnabledSound', CheckboxType::class)
            ->add('development', ChoiceType::class, array('choices' => array('Production' => 'Production', 'Sandbox' => 'Sandbox', ), 'expanded' => false, 'multiple' => false))
            ->add('status', ChoiceType::class, array('choices' => array('Active' => 'Active', 'Uninstalled' => 'Uninstalled', ), 'expanded' => false, 'multiple' => false))
            ->add('ip', TextType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\SportClubBundle\Entity\PushDevice'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'SportClubBundle_PushDevice';
    }
}