<?php

namespace ContinuousNet\BiodyXpertBundle\Form;

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
 * Patient Type
 * 
 * Render Patient Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\BiodyXpertBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://biodyxpert.continuousnet.com/ContinuousNet\BiodyXpertBundle/Form
 * @see        PatientType
 * @since      Class available since Release 1.0
 * @access     public
 */
class PatientType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName', TextType::class)
            ->add('lastName', TextType::class)
            ->add('groupName', TextType::class)
            ->add('birthDate', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('gender', ChoiceType::class, array('choices' => array('Male' => 'Male', 'Female' => 'Female', ), 'expanded' => false, 'multiple' => false))
            ->add('address', TextType::class)
            ->add('city', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('state', TextType::class)
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Country', 'choice_label' => 'name'))
            ->add('mobileNumber', TextType::class)
            ->add('email', EmailType::class)
            ->add('phone', TextType::class)
            ->add('height', TextType::class)
            ->add('cupSize', ChoiceType::class, array('choices' => array('N/A' => 'N/A', 'A' => 'A', 'B' => 'B', 'C' => 'C', 'D' => 'D', 'E' => 'E', 'F' => 'F', ), 'expanded' => false, 'multiple' => false))
            ->add('typology', ChoiceType::class, array('choices' => array('Caucasian' => 'Caucasian', 'African' => 'African', 'Hispanic' => 'Hispanic', 'Asian' => 'Asian', ), 'expanded' => false, 'multiple' => false))
            ->add('athletic', CheckboxType::class)
            ->add('physicalActivity', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:PhysicalActivity', 'choice_label' => 'name'))
            ->add('specialDiet', ChoiceType::class, array('choices' => array('Normal' => 'Normal', 'Vegetarian' => 'Vegetarian', 'Vegan' => 'Vegan', ), 'expanded' => false, 'multiple' => false))
            ->add('hormonalStatus', ChoiceType::class, array('choices' => array('Normal' => 'Normal', 'Perimenopause' => 'Perimenopause', 'Menopause' => 'Menopause', 'Postmenopause' => 'Postmenopause', 'Andropause' => 'Andropause', ), 'expanded' => false, 'multiple' => false))
            ->add('pubertyTannerStage', ChoiceType::class, array('choices' => array('None' => 'None', '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5', ), 'expanded' => false, 'multiple' => false))
            ->add('precautionsContraindications', ChoiceType::class, array('choices' => array('None' => 'None', 'Pregnancy' => 'Pregnancy', 'MetalProsthesis' => 'MetalProsthesis', 'PlatesScrews' => 'PlatesScrews', 'SurvivalDevicePacemaker' => 'SurvivalDevicePacemaker', ), 'expanded' => false, 'multiple' => false))
            ->add('primaryPathology', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Pathology', 'choice_label' => 'name'))
            ->add('secondaryPathology', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Pathology', 'choice_label' => 'name'))
            ->add('otherPathologies', TextType::class)
            ->add('template', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Template', 'choice_label' => 'name'))
            ->add('temporaryTemplate', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Template', 'choice_label' => 'name'))
            ->add('uuid', TextType::class)
            ->add('patientGroups', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'BiodyXpertBundle:PatientGroup', 'choice_label' => 'name'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BiodyXpertBundle\Entity\Patient'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BiodyXpertBundle_Patient';
    }
}