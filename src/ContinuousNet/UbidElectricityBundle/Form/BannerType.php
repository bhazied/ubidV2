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
 * Banner Type
 * 
 * Render Banner Type 
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
 * @see        BannerType
 * @since      Class available since Release 1.0
 * @access     public
 */
class BannerType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('bannerType', EntityType::class, array('expanded' => false, 'multiple' => false, 'class' => 'UbidElectricityBundle:BannerType', 'choice_label' => 'name'))
            ->add('name', TextType::class)
            ->add('picture', TextType::class)
            ->add('closable', CheckboxType::class)
            ->add('countDown', IntegerType::class)
            ->add('iphoneAction', TextType::class)
            ->add('androidAction', TextType::class)
            ->add('webAction', TextType::class)
            ->add('gender', ChoiceType::class, array('choices' => array('All' => 'All', 'Male' => 'Male', 'Female' => 'Female', ), 'expanded' => false, 'multiple' => false))
            ->add('minAge', IntegerType::class)
            ->add('maxAge', IntegerType::class)
            ->add('priority', IntegerType::class)
            ->add('webUrl', TextType::class)
            ->add('phoneNumberToCall', TextType::class)
            ->add('smsMobileNumber', TextType::class)
            ->add('smsBody', TextType::class)
            ->add('emailAdress', TextType::class)
            ->add('emailSubject', TextType::class)
            ->add('emailBody', TextType::class)
            ->add('androidAppUrl', TextType::class)
            ->add('iphoneAppUrl', TextType::class)
            ->add('youtubeUrl', TextType::class)
            ->add('mapLatitude', TextType::class)
            ->add('mapLongitude', TextType::class)
            ->add('screen', TextType::class)
            ->add('screenParameters', TextType::class)
            ->add('totalHits', IntegerType::class)
            ->add('todayHits', IntegerType::class)
            ->add('totalClicks', IntegerType::class)
            ->add('todayClicks', IntegerType::class)
            ->add('template', TextType::class)
            ->add('adText', TextType::class)
            ->add('textColor', TextType::class)
            ->add('backgroundColor', TextType::class)
            ->add('autoPublishing', CheckboxType::class)
            ->add('startPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('endPublishing', DateTimeType::class, array('widget' => 'single_text', 'input' => 'datetime'))
            ->add('startPublishingTime', IntegerType::class)
            ->add('endPublishingTime', IntegerType::class)
            ->add('maxClicksPerDay', IntegerType::class)
            ->add('maxTotalClicks', IntegerType::class)
            ->add('maxHitsPerDay', IntegerType::class)
            ->add('maxTotalHits', IntegerType::class)
            ->add('status', ChoiceType::class, array('choices' => array('Draft' => 'Draft', 'Online' => 'Online', 'Deactivated' => 'Deactivated', 'Offline' => 'Offline', 'Deleted' => 'Deleted', 'Archived' => 'Archived', ), 'expanded' => false, 'multiple' => false))
            ->add('bannerPositions', EntityType::class, array('expanded' => true, 'multiple' => true, 'class' => 'UbidElectricityBundle:BannerPosition', 'choice_label' => 'name'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ContinuousNet\UbidElectricityBundle\Entity\Banner'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'UbidElectricityBundle_Banner';
    }
}