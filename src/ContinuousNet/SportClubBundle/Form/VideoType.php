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
 * Video Type
 * 
 * Render Video Type 
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
 * @see        VideoType
 * @since      Class available since Release 1.0
 * @access     public
 */
class VideoType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('videoType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:VideoType', 'choice_label' => 'name'))
            ->add('price', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:Price', 'choice_label' => 'name'))
            ->add('sharing', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:Sharing', 'choice_label' => 'name'))
            ->add('name', TextType::class)
            ->add('nameAr', TextType::class)
            ->add('nameFr', TextType::class)
            ->add('slug', TextType::class)
            ->add('slugAr', TextType::class)
            ->add('slugFr', TextType::class)
            ->add('picture', TextType::class)
            ->add('file', TextType::class)
            ->add('fileSize', IntegerType::class)
            ->add('watermarkText', TextType::class)
            ->add('description', TextType::class)
            ->add('descriptionAr', TextType::class)
            ->add('descriptionFr', TextType::class)
            ->add('show', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'SportClubBundle:Show', 'choice_label' => 'name'))
            ->add('seasonNumber', IntegerType::class)
            ->add('episodeNumber', IntegerType::class)
            ->add('duration', IntegerType::class)
            ->add('remoteSource', CheckboxType::class)
            ->add('url', TextareaType::class)
            ->add('alternativeUrl', TextareaType::class)
            ->add('copyright', TextType::class)
            ->add('isTop', CheckboxType::class)
            ->add('isNew', CheckboxType::class)
            ->add('status', ChoiceType::class, array('choices' => array('Draft' => 'Draft', 'Online' => 'Online', 'Deactivated' => 'Deactivated', 'Offline' => 'Offline', 'Deleted' => 'Deleted', 'Archived' => 'Archived', ), 'expanded' => false, 'multiple' => false))
            ->add('totalPreviewed', IntegerType::class)
            ->add('totalDownloads', IntegerType::class)
            ->add('totalHits', IntegerType::class)
            ->add('totalComments', IntegerType::class)
            ->add('totalRatings', IntegerType::class)
            ->add('averageRatings', IntegerType::class)
            ->add('totalLikes', IntegerType::class)
            ->add('totalDislikes', IntegerType::class)
            ->add('totalBookmarks', IntegerType::class)
            ->add('enableStreaming', CheckboxType::class)
            ->add('autoPublishing', CheckboxType::class)
            ->add('startPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('endPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('videoCategories', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'SportClubBundle:VideoCategory', 'choice_label' => 'name'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\SportClubBundle\Entity\Video'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'SportClubBundle_Video';
    }
}