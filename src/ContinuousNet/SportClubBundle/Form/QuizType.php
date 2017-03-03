<?php

namespace ContinuousNet\SportClubBundle\Form;

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
 * Quiz Type
 * 
 * Render Quiz Type 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Type
 * @package    ContinuousNet\SportClubBundle\Form
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license   AMINOGRAM REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet\SportClubBundle/Form
 * @see        QuizType
 * @since      Class available since Release 1.0
 * @access     public
 */
class QuizType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('quizType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:QuizType', 'choice_label' => 'name'))
            ->add('title', TextType::class)
            ->add('titleAr', TextType::class)
            ->add('titleFr', TextType::class)
            ->add('slug', TextType::class)
            ->add('slugAr', TextType::class)
            ->add('slugFr', TextType::class)
            ->add('picture', TextType::class)
            ->add('description', TextareaType::class)
            ->add('descriptionAr', TextareaType::class)
            ->add('descriptionFr', TextareaType::class)
            ->add('kind', ChoiceType::class, array('choices' => array('SingleChoice' => 'SingleChoice', 'MultipleChoice' => 'MultipleChoice', ), 'expanded' => false, 'multiple' => false))
            ->add('question', TextType::class)
            ->add('questionAr', TextType::class)
            ->add('questionFr', TextType::class)
            ->add('choice1', TextType::class)
            ->add('choice1Ar', TextType::class)
            ->add('choice1Fr', TextType::class)
            ->add('choice1IsCorrect', CheckboxType::class)
            ->add('choice2', TextType::class)
            ->add('choice2Ar', TextType::class)
            ->add('choice2Fr', TextType::class)
            ->add('choice2IsCorrect', CheckboxType::class)
            ->add('choice3', TextType::class)
            ->add('choice3Ar', TextType::class)
            ->add('choice3Fr', TextType::class)
            ->add('choice3IsCorrect', CheckboxType::class)
            ->add('choice4', TextType::class)
            ->add('choice4Ar', TextType::class)
            ->add('choice4Fr', TextType::class)
            ->add('choice4IsCorrect', CheckboxType::class)
            ->add('choice5', TextType::class)
            ->add('choice5Ar', TextType::class)
            ->add('choice5Fr', TextType::class)
            ->add('choice5IsCorrect', CheckboxType::class)
            ->add('choice6', TextType::class)
            ->add('choice6Ar', TextType::class)
            ->add('choice6Fr', TextType::class)
            ->add('choice6IsCorrect', CheckboxType::class)
            ->add('choice7', TextType::class)
            ->add('choice7Ar', TextType::class)
            ->add('choice7Fr', TextType::class)
            ->add('choice7IsCorrect', CheckboxType::class)
            ->add('choice8', TextType::class)
            ->add('choice8Ar', TextType::class)
            ->add('choice8Fr', TextType::class)
            ->add('choice8IsCorrect', CheckboxType::class)
            ->add('autoPublishing', CheckboxType::class)
            ->add('startPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('endPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('publishDate', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('status', ChoiceType::class, array('choices' => array('Draft' => 'Draft', 'Online' => 'Online', 'Deactivated' => 'Deactivated', 'Offline' => 'Offline', 'Deleted' => 'Deleted', 'Archived' => 'Archived', ), 'expanded' => false, 'multiple' => false))
            ->add('countAnswers', IntegerType::class)
            ->add('countWinners', IntegerType::class)
            ->add('isFinished', CheckboxType::class)
            ->add('ordering', IntegerType::class)
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\SportClubBundle\Entity\Quiz'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'SportClubBundle_Quiz';
    }
}