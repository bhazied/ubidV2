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

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            //->add('email', TextType::class)
            //->add('username', TextType::class)
            //->add('password', TextType::class)
            ->add('type', ChoiceType::class, array('choices' => array('Guest' => 'Guest', 'Both' => 'Both', 'Buyer' => 'Buyer', 'Supplier' => 'Supplier', 'Administrator' => 'Administrator'), 'expanded' => false, 'multiple' => false))
            ->add('phone', TextType::class)
            //->add('mobile', TextType::class)
            ->add('gender', ChoiceType::class, array('choices' => array('Male' => 'Male', 'Female' => 'Female', ), 'expanded' => false, 'multiple' => false))
            ->add('firstName', TextType::class)
            ->add('companyName', TextType::class)
            ->add('job', TextType::class)
            //->add('authenticationMode', TextType::class)
            ->add('lastName', TextType::class)
            //->add('birthDate', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            //->add('picture', TextType::class)
            ->add('address', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Country', 'choice_label' => 'name'))
            ->add('language', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Language', 'choice_label' => 'name'))
            ->add('groups', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'UbidElectricityBundle:Group', 'choice_label' => 'name'))
            //->add('profile', TextType::class)
            ->add('roles', ChoiceType::class, array('choices' => array('ROLE_API' => 'ROLE_API', 'ROLE_SUBSCRIBER' => 'ROLE_SUBSCRIBER', 'ROLE_ADMIN' => 'ROLE_ADMIN', 'ROLE_ADMIN_PUBLISHER' => 'ROLE_ADMIN_PUBLISHER', 'ROLE_SUPER_ADMIN' => 'ROLE_SUPER_ADMIN', ), 'expanded' => true, 'multiple' => true))
        ;
    }

    public function getParent()
    {
        return 'FOS\UserBundle\Form\Type\RegistrationFormType';
    }

    public function getBlockPrefix()
    {
        return 'app_user_registration';
    }

    public function getName()
    {
        return $this->getBlockPrefix();
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            //'data_class'      => 'ContinuousNet\UbidElectricityBundle\Entity\User',
            'csrf_protection' => false
        );
    }

}
