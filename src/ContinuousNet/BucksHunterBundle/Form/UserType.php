<?php

namespace ContinuousNet\BucksHunterBundle\Form;

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
 * @package    ContinuousNet\BucksHunterBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://buckshunter.continuousnet.com/ContinuousNet\BucksHunterBundle/Form
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
            ->add('type', ChoiceType::class, array('choices' => array('Gamer' => 'Gamer', 'Administrator' => 'Administrator', ), 'expanded' => false, 'multiple' => false))
            ->add('username', TextType::class)
            ->add('password', PasswordType::class)
            ->add('salt', TextType::class)
            ->add('phone', TextType::class)
            ->add('email', EmailType::class)
            ->add('usernameCanonical', TextType::class)
            ->add('emailCanonical', TextType::class)
            ->add('gender', ChoiceType::class, array('choices' => array('Male' => 'Male', 'Female' => 'Female', ), 'expanded' => false, 'multiple' => false))
            ->add('name', TextType::class)
            ->add('nickname', TextType::class)
            ->add('picture', TextType::class)
            ->add('address', TextType::class)
            ->add('zipCode', TextType::class)
            ->add('country', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:Country', 'choice_label' => 'name'))
            ->add('city', TextType::class)
            ->add('language', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:Language', 'choice_label' => 'name'))
            ->add('facebookKey', TextType::class)
            ->add('facebookAccessToken', TextType::class)
            ->add('twitterKey', TextType::class)
            ->add('twitterAccessToken', TextType::class)
            ->add('googleKey', TextType::class)
            ->add('googleAccessToken', TextType::class)
            ->add('currentScore', IntegerType::class)
            ->add('currentLevel', IntegerType::class)
            ->add('enableOauth', CheckboxType::class)
            ->add('sessionTimeout', IntegerType::class)
            ->add('multipleSession', CheckboxType::class)
            ->add('phoneValidated', CheckboxType::class)
            ->add('phoneValidationCode', TextType::class)
            ->add('emailValidated', CheckboxType::class)
            ->add('emailValidationCode', TextType::class)
            ->add('authenticationMode', ChoiceType::class, array('choices' => array('Database' => 'Database', 'ActiveDirectory' => 'ActiveDirectory', 'Webservice' => 'Webservice', ), 'expanded' => false, 'multiple' => false))
            ->add('roles', ChoiceType::class, array('choices' => array('ROLE_API' => 'ROLE_API', 'ROLE_GAMER' => 'ROLE_GAMER', 'ROLE_ADMIN' => 'ROLE_ADMIN', ), 'expanded' => true, 'multiple' => true))
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
            ->add('invitationCode', TextType::class)
            ->add('usedInvitationCode', TextType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BucksHunterBundle\Entity\User'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BucksHunterBundle_User';
    }
}