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
 * Game Type
 * 
 * Render Game Type 
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
 * @see        GameType
 * @since      Class available since Release 1.0
 * @access     public
 */
class GameType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('player1User', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:User', 'choice_label' => 'username'))
            ->add('player2User', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:User', 'choice_label' => 'username'))
            ->add('preferred', CheckboxType::class)
            ->add('level', IntegerType::class)
            ->add('player1DownloadTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player2DownloadTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player1StartTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player2StartTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player1EndTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player2EndTime', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('player1AppTime', IntegerType::class)
            ->add('player2AppTime', IntegerType::class)
            ->add('puzzle', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'BucksHunterBundle:Puzzle', 'choice_label' => 'name'))
            ->add('status', ChoiceType::class, array('choices' => array('Searching' => 'Searching', 'Matching' => 'Matching', 'Matched' => 'Matched', 'Downloading' => 'Downloading', 'Downloaded' => 'Downloaded', 'Strated' => 'Strated', 'Playing' => 'Playing', 'Ended' => 'Ended', 'Scored' => 'Scored', 'Canceled' => 'Canceled', ), 'expanded' => false, 'multiple' => false))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\BucksHunterBundle\Entity\Game'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'BucksHunterBundle_Game';
    }
}