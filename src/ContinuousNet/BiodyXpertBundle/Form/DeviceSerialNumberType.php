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
 * Device Serial Number Type
 * 
 * Render Device Serial Number Type 
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
 * @see        DeviceSerialNumberType
 * @since      Class available since Release 1.0
 * @access     public
 */
class DeviceSerialNumberType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('licence', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BiodyXpertBundle:Licence', 'choice_label' => 'licenceKey'))
            ->add('serialNumber', TextType::class)
            ->add('users', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'BiodyXpertBundle:User', 'choice_label' => 'username'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BiodyXpertBundle\Entity\DeviceSerialNumber'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BiodyXpertBundle_DeviceSerialNumber';
    }
}