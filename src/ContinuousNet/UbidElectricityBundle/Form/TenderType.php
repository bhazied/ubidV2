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
 * Tender Type
 * 
 * Render Tender Type 
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
 * @see        TenderType
 * @since      Class available since Release 1.0
 * @access     public
 */
class TenderType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('section', ChoiceType::class, array('choices' => array('Consultation' => 'Consultation', 'Tender' => 'Tender', ), 'expanded' => false, 'multiple' => false))
            ->add('buyer', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Buyer', 'choice_label' => 'name'))
            ->add('supplier', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Supplier', 'choice_label' => 'name'))
            ->add('region', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Region', 'choice_label' => 'name'))
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Country', 'choice_label' => 'name'))
            ->add('sector', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Sector', 'choice_label' => 'name'))
            ->add('tenderType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:TenderType', 'choice_label' => 'name'))
            ->add('biddingType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:BiddingType', 'choice_label' => 'name'))
            ->add('title', TextType::class)
            ->add('slug', TextType::class)
            ->add('reference', TextType::class)
            ->add('fees', TextType::class)
            ->add('description', TextareaType::class)
            ->add('status', ChoiceType::class, array('choices' => array('Draft' => 'Draft', 'Online' => 'Online', 'Deactivated' => 'Deactivated', 'Offline' => 'Offline', 'Deleted' => 'Deleted', 'Archived' => 'Archived', ), 'expanded' => false, 'multiple' => false))
            ->add('publishDate', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('deadline', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('estimatedCost', IntegerType::class)
            ->add('address', TextType::class)
            ->add('email', EmailType::class)
            ->add('phone', TextType::class)
            ->add('attachmentFiles', TextType::class)
            ->add('source', TextType::class)
            ->add('validated', CheckboxType::class)
            ->add('views', IntegerType::class)
            ->add('categories', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'UbidElectricityBundle:Category', 'choice_label' => 'name'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\Tender'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_Tender';
    }
}