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
 * Score Type
 * 
 * Render Score Type 
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
 * @see        ScoreType
 * @since      Class available since Release 1.0
 * @access     public
 */
class ScoreType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', ChoiceType::class, array('choices' => array('GameWon' => 'GameWon', 'Register' => 'Register', 'Facebook' => 'Facebook', 'Twitter' => 'Twitter', 'Istagram' => 'Istagram', 'AppRating' => 'AppRating', 'Invitation' => 'Invitation', 'Video' => 'Video', ), 'expanded' => false, 'multiple' => false))
            ->add('value', IntegerType::class)
            ->add('game', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:Game', 'choice_label' => 'id'))
            ->add('gameTime', IntegerType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BucksHunterBundle\Entity\Score'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BucksHunterBundle_Score';
    }
}