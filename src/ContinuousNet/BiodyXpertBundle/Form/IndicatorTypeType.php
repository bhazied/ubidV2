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
 * Indicator Type Type
 * 
 * Render Indicator Type Type 
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
 * @see        IndicatorTypeType
 * @since      Class available since Release 1.0
 * @access     public
 */
class IndicatorTypeType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class)
            ->add('variables', TextType::class)
            ->add('historyVariables', TextType::class)
            ->add('units', TextType::class)
            ->add('chartType', TextType::class)
            ->add('color', TextType::class)
            ->add('defaultPeriod', TextType::class)
            ->add('settings', TextType::class)
            ->add('showCurrentValue', CheckboxType::class)
            ->add('showCurrentPercent', CheckboxType::class)
            ->add('showFirstGapValue', CheckboxType::class)
            ->add('showFirstGapPercent', CheckboxType::class)
            ->add('showLastGapValue', CheckboxType::class)
            ->add('showLastGapPercent', CheckboxType::class)
            ->add('published', CheckboxType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BiodyXpertBundle\Entity\IndicatorType'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BiodyXpertBundle_IndicatorType';
    }
}