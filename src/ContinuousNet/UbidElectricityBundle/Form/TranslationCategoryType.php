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
 * Translation Category Type
 * 
 * Render Translation Category Type 
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
 * @see        TranslationCategoryType
 * @since      Class available since Release 1.0
 * @access     public
 */
class TranslationCategoryType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('category', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Category', 'choice_label' => 'name'))
            ->add('locale', TextType::class)
            ->add('name', TextType::class)
            ->add('description', TextType::class)
            ->add('metaTitle', TextareaType::class)
            ->add('metaDescription', TextareaType::class)
            ->add('metaKeywords', TextareaType::class)
            ->add('tendersDescription', TextareaType::class)
            ->add('tendersMetaTitle', TextareaType::class)
            ->add('tendersMetaDescription', TextareaType::class)
            ->add('tendersMetaKeywords', TextareaType::class)
            ->add('consultationsDescription', TextareaType::class)
            ->add('consultationsMetaTitle', TextareaType::class)
            ->add('consultationsMetaDescription', TextareaType::class)
            ->add('consultationsMetaKeywords', TextareaType::class)
            ->add('buyersDescription', TextareaType::class)
            ->add('buyersMetaTitle', TextareaType::class)
            ->add('buyersMetaDescription', TextareaType::class)
            ->add('buyersMetaKeywords', TextareaType::class)
            ->add('suppliersDescription', TextareaType::class)
            ->add('suppliersMetaTitle', TextareaType::class)
            ->add('suppliersMetaDescription', TextareaType::class)
            ->add('suppliersMetaKeywords', TextareaType::class)
            ->add('validated', CheckboxType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\TranslationCategory'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_TranslationCategory';
    }
}