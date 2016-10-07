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
 * Push Notification Type
 * 
 * Render Push Notification Type 
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
 * @see        PushNotificationType
 * @since      Class available since Release 1.0
 * @access     public
 */
class PushNotificationType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('message', TextType::class)
            ->add('type', ChoiceType::class, array('choices' => array('NewGame' => 'NewGame', 'MatchMaking' => 'MatchMaking', 'PlayAgain' => 'PlayAgain', 'Download' => 'Download', 'StartGame' => 'StartGame', 'EndGame' => 'EndGame', 'Promotion' => 'Promotion', ), 'expanded' => false, 'multiple' => false))
            ->add('category', TextType::class)
            ->add('badge', IntegerType::class)
            ->add('sound', TextType::class)
            ->add('game', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:Game', 'choice_label' => 'id'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BucksHunterBundle\Entity\PushNotification'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BucksHunterBundle_PushNotification';
    }
}