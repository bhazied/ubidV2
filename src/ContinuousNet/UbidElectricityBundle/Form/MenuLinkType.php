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
 * Menu Link Type
 * 
 * Render Menu Link Type 
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
 * @see        MenuLinkType
 * @since      Class available since Release 1.0
 * @access     public
 */
class MenuLinkType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('menu', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Menu', 'choice_label' => 'name'))
            ->add('name', TextType::class)
            ->add('slug', TextType::class)
            ->add('isPublished', CheckboxType::class)
            ->add('controller', TextType::class)
            ->add('action', TextType::class)
            ->add('foreignKey', IntegerType::class)
            ->add('ordering', IntegerType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\MenuLink'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_MenuLink';
    }
}