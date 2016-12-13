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
 * Supplier Type
 * 
 * Render Supplier Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\UbidElectricityBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://ubidelectricity.continuousnet.com/ContinuousNet\UbidElectricityBundle/Form
 * @see        SupplierType
 * @since      Class available since Release 1.0
 * @access     public
 */
class SupplierType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('supplierType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:SupplierType', 'choice_label' => 'name'))
            ->add('name', TextType::class)
            ->add('description', TextType::class)
            ->add('mainProductsServices', TextType::class)
            ->add('referenceNumber', TextType::class)
            ->add('phone', TextType::class)
            ->add('fax', TextType::class)
            ->add('website', TextType::class)
            ->add('email', EmailType::class)
            ->add('firstName', TextType::class)
            ->add('lastName', TextType::class)
            ->add('job', TextType::class)
            ->add('picture', TextType::class)
            ->add('address', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('city', TextType::class)
            ->add('companyName', TextType::class)
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Country', 'choice_label' => 'name'))
            ->add('language', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Language', 'choice_label' => 'name'))
            ->add('totalRevenu', IntegerType::class)
            ->add('firstMarketRegion', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Region', 'choice_label' => 'name'))
            ->add('firstMarketRate', CheckboxType::class)
            ->add('secondMarketRegion', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Region', 'choice_label' => 'name'))
            ->add('secondMarketRate', CheckboxType::class)
            ->add('thirdMarketRegion', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Region', 'choice_label' => 'name'))
            ->add('thirdMarketRate', CheckboxType::class)
            ->add('isPublic', CheckboxType::class)
            ->add('views', IntegerType::class)
            ->add('enableComment', CheckboxType::class)
            ->add('enablePrivateMessage', CheckboxType::class)
            ->add('enableShare', CheckboxType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\Supplier'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_Supplier';
    }
}