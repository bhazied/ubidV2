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
 * User Type
 * 
 * Render User Type 
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
 * @see        UserType
 * @since      Class available since Release 1.0
 * @access     public
 */
class UserType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', ChoiceType::class, array('choices' => array('Guest' => 'Guest', 'Buyer' => 'Buyer', 'Supplier' => 'Supplier', 'Both' => 'Both', 'Administrator' => 'Administrator', ), 'expanded' => false, 'multiple' => false))
            ->add('username', TextType::class)
            ->add('password', PasswordType::class)
            ->add('salt', TextType::class)
            ->add('phone', TextType::class)
            ->add('email', EmailType::class)
            ->add('usernameCanonical', TextType::class)
            ->add('emailCanonical', TextType::class)
            ->add('gender', ChoiceType::class, array('choices' => array('Male' => 'Male', 'Female' => 'Female', ), 'expanded' => false, 'multiple' => false))
            ->add('firstName', TextType::class)
            ->add('lastName', TextType::class)
            ->add('picture', TextType::class)
            ->add('address', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('companyName', TextType::class)
            ->add('job', TextType::class)
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Country', 'choice_label' => 'name'))
            ->add('language', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:Language', 'choice_label' => 'name'))
            ->add('profile', TextType::class)
            ->add('enableOauth', CheckboxType::class)
            ->add('sessionTimeout', IntegerType::class)
            ->add('multipleSession', CheckboxType::class)
            ->add('phoneValidated', CheckboxType::class)
            ->add('phoneValidationCode', TextType::class)
            ->add('emailValidated', CheckboxType::class)
            ->add('emailValidationCode', TextType::class)
            ->add('authenticationMode', ChoiceType::class, array('choices' => array('Database' => 'Database', 'ActiveDirectory' => 'ActiveDirectory', 'Webservice' => 'Webservice', ), 'expanded' => false, 'multiple' => false))
            ->add('roles', ChoiceType::class, array('choices' => array('ROLE_API' => 'ROLE_API', 'ROLE_SUBSCRIBER' => 'ROLE_SUBSCRIBER', 'ROLE_ADMIN' => 'ROLE_ADMIN', 'ROLE_CALL_CANTER' => 'ROLE_CALL_CANTER', 'ROLE_IT' => 'ROLE_IT', 'ROLE_SUPER_ADMIN' => 'ROLE_SUPER_ADMIN', ), 'expanded' => true, 'multiple' => true))
            ->add('enabled', CheckboxType::class)
            ->add('confirmationToken', TextType::class)
            ->add('passwordRequestedAt', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('locked', CheckboxType::class)
            ->add('expired', CheckboxType::class)
            ->add('expiresAt', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('credentialsExpired', CheckboxType::class)
            ->add('credentialsExpireAt', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('lastLogin', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('lastFailedLogin', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('loginCount', IntegerType::class)
            ->add('failedLoginCount', IntegerType::class)
            ->add('lastFailedLoginCount', IntegerType::class)
            ->add('groups', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'UbidElectricityBundle:Group', 'choice_label' => 'name'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\User'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_User';
    }
}