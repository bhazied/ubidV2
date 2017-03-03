<?php

namespace ContinuousNet\BiodyXpertBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Events;
use Doctrine\Common\Collections\ArrayCollection as DoctrineCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Groups;

/**
 * Measurement Entity
 * 
 * Storing Measurements data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\BiodyXpertBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Entity
 * @see        Measurement
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`measurement`", indexes={@ORM\Index(name="patient_id", columns={"patient_id"}), @ORM\Index(name="physical_activity_id", columns={"physical_activity_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Measurement 
{
    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="id", type="integer", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * 
     * @Expose
     * 
     */
    private $id;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`burst_identifier`", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $burstIdentifier;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`burst_group`", type="string", length=200, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $burstGroup;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`weight`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $weight;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`height`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $height;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cup_size`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cupSize;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`birth_date`", type="date", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $birthDate;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`status`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $status;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`app_name`", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $appName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`app_version`", type="string", length=5, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $appVersion;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`device_date`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $deviceDate;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`battery_level`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $batteryLevel;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`data_received`", type="string", length=300, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dataReceived;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a5`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a5;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a20`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a20;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a50`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a50;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a200`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a200;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z5`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z5;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z20`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z20;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z50`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z50;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z200`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z200;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z350`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z350;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`phase_angle`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $phaseAngle;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`act`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $act;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`k`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $k;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`smi_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $smiRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_cc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirCcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_muh_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirMuhRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_muh_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirMuhRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_cc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirCcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_muh_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirMuhRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_cc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirCcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`hac`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $hac;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`wac`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $wac;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`a50_radian`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $a50Radian;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`x50`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $x50;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`r50`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $r50;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmr_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmrRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_ref_inf`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcRefInf;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_ref_sup`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcRefSup;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmci`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmci;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_ref_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcRefKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_ref_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmRefKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffm_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffmKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffm_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffmPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffm_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffm_ref_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmRefKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffm_et_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmEtKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmm_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmm_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmm_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmffmr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmffmr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_spec`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwSpec;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecwffm_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwffmPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecwicw_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwicwPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cmo`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cmo;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slm`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slm;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mo`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mo;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecs`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecs;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ms`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ms;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`smi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $smi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmi_indice_comp`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmiIndiceComp;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmir;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dasmm_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dasmmKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffeir_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffeirRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmr_ref_kjoules`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmrRefKjoules;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbw_fm`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwFm;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`z200z5r`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $z200z5r;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmr_kjoules`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmrKjoules;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_kjoules`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrKjoules;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_et_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcEtKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_et_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmEtKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_ref_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsRefKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_et_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsEtKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcm`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcm;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_meta_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_meta_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbw_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icwfm`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwfm;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecwfm`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwfm;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwicw_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwicwPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffeir`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffeir;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mp;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmli`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmli;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmffmr`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmffmr;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmir;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmir;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_ref_div_ffecw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwRefDivFfecw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_ref_div_fficw`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwRefDivFficw;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmr_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmrEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mms_pc_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmsPcEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbe`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbe;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cmo_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cmoRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cmo_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cmoEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slm_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmtli`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmtli;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecs_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecsRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_meta_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcm_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcm_et`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmEt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_meta_et_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaEtKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mmhi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mmhi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mmhi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mmhi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_inf`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcInf;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`adcr_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`adcr_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`adcr_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`adcr_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`adcr_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_ref_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcRef100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmmi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmmi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmmi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmmi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_ref_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcRef100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_ref_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcRef100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`dffmi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`dffmi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`dffmi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`dffmi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetai;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mp_metai_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffmi_ref`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffmiRef;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffm_ref_kg`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffmRefKg;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`iffmi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`iffmi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`iffmi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`iffmi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmri;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bmri_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bmri_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bmri_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bmri_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_100`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPc100;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmhi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmhi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmhi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmhi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmi;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bcmi_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bcmi_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bcmi_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`bcmi_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_norms`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcNorms;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_f`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdF;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_std_g`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcStdG;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zd_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZdMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_zd_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZdMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_ze_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZeMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_ze_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZeMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zf_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZfMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_zf_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZfMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zg_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZgMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`imc_zg_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZgMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fmslmir_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fmslmir_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fmir_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fmir_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slmir_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slmir_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`whr_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`whr_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`whtr_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`whtr_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_za_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZaMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_za_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZaMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_zb_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZbMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_zb_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZbMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_zc_max`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZcMax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_zc_max_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZcMaxColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScZone;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_za_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZaColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_zb_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZbColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_zc_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZcColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_zd_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZdColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_ze_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZeColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cible_zf_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZfColor;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_zone`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleZone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_point`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ciblePoint;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_icw_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleIcwPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_icw_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleIcwPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_icw_pc_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleIcwPcStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_icw_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleIcwPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_fm_hc_pc_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFmHcPcStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_fm_hc_pc_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFmHcPcStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_fm_hc_pc_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFmHcPcStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_fm_hc_pc_std_e`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFmHcPcStdE;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_ffw_std_a`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFfwStdA;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_ffw_std_b`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFfwStdB;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_ffw_std_c`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFfwStdC;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_ffw_std_d`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFfwStdD;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_hc_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmHcPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mmhi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mmhiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_cons_inf`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrConsInf;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`adcr_cons_sup`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $adcrConsSup;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmmi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmmiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ecw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ecwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`icw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $icwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fm_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`tbwffm_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tbwffmPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`dffmi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $dffmiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`mp_metai_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mpMetaiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`iffmi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $iffmiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bmri_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bmriPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`ffecwi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ffecwiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fficwi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fficwiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`asmhi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmhiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`bcmi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bcmiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`imc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $imcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whr_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whrCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`whtr_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $whtrCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_cc_sc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalCcScPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmslmir_muh_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmslmirMuhSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fmir_muh_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fmirMuhSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`slmir_muh_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slmirMuhSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhSc;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`total_muh_sc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalMuhScPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_icw_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleIcwPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_imc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleImcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_fm_hc_pc_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFmHcPcPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_mmhi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleMmhiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_asmhi_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleAsmhiPos;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`cible_ffw_pos`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $cibleFfwPos;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmli_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmliColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`asmtli_color`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $asmtliColor;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`request`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $request;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`response`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $response;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`interpretation_date`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $interpretationDate;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`created_at`", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $createdAt;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`modified_at`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $modifiedAt;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`thighs_size`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $thighsSize;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`hips_size`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $hipsSize;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`waist_size`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $waistSize;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`chest_size`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $chestSize;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`biceps_size`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $bicepsSize;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`age`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $age;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Patient
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Patient")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="patient_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $patient;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="PhysicalActivity")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="physical_activity_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $physicalActivity;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="creator_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $creatorUser;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="modifier_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $modifierUser;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
    }

    /**
     * Get id
     *
     * @access public
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set burstIdentifier
     *
     * @access public
     * @param string $burstIdentifier
     * @return Measurement
     */
    public function setBurstIdentifier($burstIdentifier = null)
    {
        $this->burstIdentifier = $burstIdentifier;
        return $this;
    }

    /**
     * Get burstIdentifier
     *
     * @access public
     * @return string 
     */
    public function getBurstIdentifier()
    {
        return $this->burstIdentifier;
    }

    /**
     * Set burstGroup
     *
     * @access public
     * @param string $burstGroup
     * @return Measurement
     */
    public function setBurstGroup($burstGroup = null)
    {
        $this->burstGroup = $burstGroup;
        return $this;
    }

    /**
     * Get burstGroup
     *
     * @access public
     * @return string 
     */
    public function getBurstGroup()
    {
        return $this->burstGroup;
    }

    /**
     * Set weight
     *
     * @access public
     * @param float $weight
     * @return Measurement
     */
    public function setWeight($weight = null)
    {
        $this->weight = $weight;
        return $this;
    }

    /**
     * Get weight
     *
     * @access public
     * @return float 
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set height
     *
     * @access public
     * @param float $height
     * @return Measurement
     */
    public function setHeight($height = null)
    {
        $this->height = $height;
        return $this;
    }

    /**
     * Get height
     *
     * @access public
     * @return float 
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * Set cupSize
     *
     * @access public
     * @param string $cupSize
     * @return Measurement
     */
    public function setCupSize($cupSize = null)
    {
        $this->cupSize = $cupSize;
        return $this;
    }

    /**
     * Get cupSize
     *
     * @access public
     * @return string 
     */
    public function getCupSize()
    {
        return $this->cupSize;
    }

    /**
     * Set birthDate
     *
     * @access public
     * @param \DateTime $birthDate
     * @return Measurement
     */
    public function setBirthDate(\DateTime $birthDate = null)
    {
        $this->birthDate = $birthDate;
        return $this;
    }

    /**
     * Get birthDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Measurement
     */
    public function setStatus($status = null)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Get status
     *
     * @access public
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set appName
     *
     * @access public
     * @param string $appName
     * @return Measurement
     */
    public function setAppName($appName = null)
    {
        $this->appName = $appName;
        return $this;
    }

    /**
     * Get appName
     *
     * @access public
     * @return string 
     */
    public function getAppName()
    {
        return $this->appName;
    }

    /**
     * Set appVersion
     *
     * @access public
     * @param string $appVersion
     * @return Measurement
     */
    public function setAppVersion($appVersion = null)
    {
        $this->appVersion = $appVersion;
        return $this;
    }

    /**
     * Get appVersion
     *
     * @access public
     * @return string 
     */
    public function getAppVersion()
    {
        return $this->appVersion;
    }

    /**
     * Set deviceDate
     *
     * @access public
     * @param \DateTime $deviceDate
     * @return Measurement
     */
    public function setDeviceDate(\DateTime $deviceDate = null)
    {
        $this->deviceDate = $deviceDate;
        return $this;
    }

    /**
     * Get deviceDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getDeviceDate()
    {
        return $this->deviceDate;
    }

    /**
     * Set batteryLevel
     *
     * @access public
     * @param integer $batteryLevel
     * @return Measurement
     */
    public function setBatteryLevel($batteryLevel = null)
    {
        $this->batteryLevel = $batteryLevel;
        return $this;
    }

    /**
     * Get batteryLevel
     *
     * @access public
     * @return integer 
     */
    public function getBatteryLevel()
    {
        return $this->batteryLevel;
    }

    /**
     * Set dataReceived
     *
     * @access public
     * @param string $dataReceived
     * @return Measurement
     */
    public function setDataReceived($dataReceived = null)
    {
        $this->dataReceived = $dataReceived;
        return $this;
    }

    /**
     * Get dataReceived
     *
     * @access public
     * @return string 
     */
    public function getDataReceived()
    {
        return $this->dataReceived;
    }

    /**
     * Set a5
     *
     * @access public
     * @param float $a5
     * @return Measurement
     */
    public function setA5($a5 = null)
    {
        $this->a5 = $a5;
        return $this;
    }

    /**
     * Get a5
     *
     * @access public
     * @return float 
     */
    public function getA5()
    {
        return $this->a5;
    }

    /**
     * Set a20
     *
     * @access public
     * @param float $a20
     * @return Measurement
     */
    public function setA20($a20 = null)
    {
        $this->a20 = $a20;
        return $this;
    }

    /**
     * Get a20
     *
     * @access public
     * @return float 
     */
    public function getA20()
    {
        return $this->a20;
    }

    /**
     * Set a50
     *
     * @access public
     * @param float $a50
     * @return Measurement
     */
    public function setA50($a50 = null)
    {
        $this->a50 = $a50;
        return $this;
    }

    /**
     * Get a50
     *
     * @access public
     * @return float 
     */
    public function getA50()
    {
        return $this->a50;
    }

    /**
     * Set a100
     *
     * @access public
     * @param float $a100
     * @return Measurement
     */
    public function setA100($a100 = null)
    {
        $this->a100 = $a100;
        return $this;
    }

    /**
     * Get a100
     *
     * @access public
     * @return float 
     */
    public function getA100()
    {
        return $this->a100;
    }

    /**
     * Set a200
     *
     * @access public
     * @param float $a200
     * @return Measurement
     */
    public function setA200($a200 = null)
    {
        $this->a200 = $a200;
        return $this;
    }

    /**
     * Get a200
     *
     * @access public
     * @return float 
     */
    public function getA200()
    {
        return $this->a200;
    }

    /**
     * Set z5
     *
     * @access public
     * @param float $z5
     * @return Measurement
     */
    public function setZ5($z5 = null)
    {
        $this->z5 = $z5;
        return $this;
    }

    /**
     * Get z5
     *
     * @access public
     * @return float 
     */
    public function getZ5()
    {
        return $this->z5;
    }

    /**
     * Set z20
     *
     * @access public
     * @param float $z20
     * @return Measurement
     */
    public function setZ20($z20 = null)
    {
        $this->z20 = $z20;
        return $this;
    }

    /**
     * Get z20
     *
     * @access public
     * @return float 
     */
    public function getZ20()
    {
        return $this->z20;
    }

    /**
     * Set z50
     *
     * @access public
     * @param float $z50
     * @return Measurement
     */
    public function setZ50($z50 = null)
    {
        $this->z50 = $z50;
        return $this;
    }

    /**
     * Get z50
     *
     * @access public
     * @return float 
     */
    public function getZ50()
    {
        return $this->z50;
    }

    /**
     * Set z100
     *
     * @access public
     * @param float $z100
     * @return Measurement
     */
    public function setZ100($z100 = null)
    {
        $this->z100 = $z100;
        return $this;
    }

    /**
     * Get z100
     *
     * @access public
     * @return float 
     */
    public function getZ100()
    {
        return $this->z100;
    }

    /**
     * Set z200
     *
     * @access public
     * @param float $z200
     * @return Measurement
     */
    public function setZ200($z200 = null)
    {
        $this->z200 = $z200;
        return $this;
    }

    /**
     * Get z200
     *
     * @access public
     * @return float 
     */
    public function getZ200()
    {
        return $this->z200;
    }

    /**
     * Set z350
     *
     * @access public
     * @param float $z350
     * @return Measurement
     */
    public function setZ350($z350 = null)
    {
        $this->z350 = $z350;
        return $this;
    }

    /**
     * Get z350
     *
     * @access public
     * @return float 
     */
    public function getZ350()
    {
        return $this->z350;
    }

    /**
     * Set phaseAngle
     *
     * @access public
     * @param float $phaseAngle
     * @return Measurement
     */
    public function setPhaseAngle($phaseAngle = null)
    {
        $this->phaseAngle = $phaseAngle;
        return $this;
    }

    /**
     * Get phaseAngle
     *
     * @access public
     * @return float 
     */
    public function getPhaseAngle()
    {
        return $this->phaseAngle;
    }

    /**
     * Set act
     *
     * @access public
     * @param float $act
     * @return Measurement
     */
    public function setAct($act = null)
    {
        $this->act = $act;
        return $this;
    }

    /**
     * Get act
     *
     * @access public
     * @return float 
     */
    public function getAct()
    {
        return $this->act;
    }

    /**
     * Set k
     *
     * @access public
     * @param float $k
     * @return Measurement
     */
    public function setK($k = null)
    {
        $this->k = $k;
        return $this;
    }

    /**
     * Get k
     *
     * @access public
     * @return float 
     */
    public function getK()
    {
        return $this->k;
    }

    /**
     * Set ecwPcRef
     *
     * @access public
     * @param float $ecwPcRef
     * @return Measurement
     */
    public function setEcwPcRef($ecwPcRef = null)
    {
        $this->ecwPcRef = $ecwPcRef;
        return $this;
    }

    /**
     * Get ecwPcRef
     *
     * @access public
     * @return float 
     */
    public function getEcwPcRef()
    {
        return $this->ecwPcRef;
    }

    /**
     * Set icwPcRef
     *
     * @access public
     * @param float $icwPcRef
     * @return Measurement
     */
    public function setIcwPcRef($icwPcRef = null)
    {
        $this->icwPcRef = $icwPcRef;
        return $this;
    }

    /**
     * Get icwPcRef
     *
     * @access public
     * @return float 
     */
    public function getIcwPcRef()
    {
        return $this->icwPcRef;
    }

    /**
     * Set smiRef
     *
     * @access public
     * @param float $smiRef
     * @return Measurement
     */
    public function setSmiRef($smiRef = null)
    {
        $this->smiRef = $smiRef;
        return $this;
    }

    /**
     * Get smiRef
     *
     * @access public
     * @return float 
     */
    public function getSmiRef()
    {
        return $this->smiRef;
    }

    /**
     * Set fmirCcRef
     *
     * @access public
     * @param float $fmirCcRef
     * @return Measurement
     */
    public function setFmirCcRef($fmirCcRef = null)
    {
        $this->fmirCcRef = $fmirCcRef;
        return $this;
    }

    /**
     * Get fmirCcRef
     *
     * @access public
     * @return float 
     */
    public function getFmirCcRef()
    {
        return $this->fmirCcRef;
    }

    /**
     * Set fmirMuhRef
     *
     * @access public
     * @param float $fmirMuhRef
     * @return Measurement
     */
    public function setFmirMuhRef($fmirMuhRef = null)
    {
        $this->fmirMuhRef = $fmirMuhRef;
        return $this;
    }

    /**
     * Get fmirMuhRef
     *
     * @access public
     * @return float 
     */
    public function getFmirMuhRef()
    {
        return $this->fmirMuhRef;
    }

    /**
     * Set fmslmirMuhRef
     *
     * @access public
     * @param float $fmslmirMuhRef
     * @return Measurement
     */
    public function setFmslmirMuhRef($fmslmirMuhRef = null)
    {
        $this->fmslmirMuhRef = $fmslmirMuhRef;
        return $this;
    }

    /**
     * Get fmslmirMuhRef
     *
     * @access public
     * @return float 
     */
    public function getFmslmirMuhRef()
    {
        return $this->fmslmirMuhRef;
    }

    /**
     * Set fmslmirCcRef
     *
     * @access public
     * @param float $fmslmirCcRef
     * @return Measurement
     */
    public function setFmslmirCcRef($fmslmirCcRef = null)
    {
        $this->fmslmirCcRef = $fmslmirCcRef;
        return $this;
    }

    /**
     * Get fmslmirCcRef
     *
     * @access public
     * @return float 
     */
    public function getFmslmirCcRef()
    {
        return $this->fmslmirCcRef;
    }

    /**
     * Set slmirMuhRef
     *
     * @access public
     * @param float $slmirMuhRef
     * @return Measurement
     */
    public function setSlmirMuhRef($slmirMuhRef = null)
    {
        $this->slmirMuhRef = $slmirMuhRef;
        return $this;
    }

    /**
     * Get slmirMuhRef
     *
     * @access public
     * @return float 
     */
    public function getSlmirMuhRef()
    {
        return $this->slmirMuhRef;
    }

    /**
     * Set slmirCcRef
     *
     * @access public
     * @param float $slmirCcRef
     * @return Measurement
     */
    public function setSlmirCcRef($slmirCcRef = null)
    {
        $this->slmirCcRef = $slmirCcRef;
        return $this;
    }

    /**
     * Get slmirCcRef
     *
     * @access public
     * @return float 
     */
    public function getSlmirCcRef()
    {
        return $this->slmirCcRef;
    }

    /**
     * Set whrRef
     *
     * @access public
     * @param float $whrRef
     * @return Measurement
     */
    public function setWhrRef($whrRef = null)
    {
        $this->whrRef = $whrRef;
        return $this;
    }

    /**
     * Get whrRef
     *
     * @access public
     * @return float 
     */
    public function getWhrRef()
    {
        return $this->whrRef;
    }

    /**
     * Set hac
     *
     * @access public
     * @param float $hac
     * @return Measurement
     */
    public function setHac($hac = null)
    {
        $this->hac = $hac;
        return $this;
    }

    /**
     * Get hac
     *
     * @access public
     * @return float 
     */
    public function getHac()
    {
        return $this->hac;
    }

    /**
     * Set wac
     *
     * @access public
     * @param float $wac
     * @return Measurement
     */
    public function setWac($wac = null)
    {
        $this->wac = $wac;
        return $this;
    }

    /**
     * Get wac
     *
     * @access public
     * @return float 
     */
    public function getWac()
    {
        return $this->wac;
    }

    /**
     * Set a50Radian
     *
     * @access public
     * @param float $a50Radian
     * @return Measurement
     */
    public function setA50Radian($a50Radian = null)
    {
        $this->a50Radian = $a50Radian;
        return $this;
    }

    /**
     * Get a50Radian
     *
     * @access public
     * @return float 
     */
    public function getA50Radian()
    {
        return $this->a50Radian;
    }

    /**
     * Set x50
     *
     * @access public
     * @param float $x50
     * @return Measurement
     */
    public function setX50($x50 = null)
    {
        $this->x50 = $x50;
        return $this;
    }

    /**
     * Get x50
     *
     * @access public
     * @return float 
     */
    public function getX50()
    {
        return $this->x50;
    }

    /**
     * Set r50
     *
     * @access public
     * @param float $r50
     * @return Measurement
     */
    public function setR50($r50 = null)
    {
        $this->r50 = $r50;
        return $this;
    }

    /**
     * Get r50
     *
     * @access public
     * @return float 
     */
    public function getR50()
    {
        return $this->r50;
    }

    /**
     * Set bmrRef
     *
     * @access public
     * @param float $bmrRef
     * @return Measurement
     */
    public function setBmrRef($bmrRef = null)
    {
        $this->bmrRef = $bmrRef;
        return $this;
    }

    /**
     * Get bmrRef
     *
     * @access public
     * @return float 
     */
    public function getBmrRef()
    {
        return $this->bmrRef;
    }

    /**
     * Set imc
     *
     * @access public
     * @param float $imc
     * @return Measurement
     */
    public function setImc($imc = null)
    {
        $this->imc = $imc;
        return $this;
    }

    /**
     * Get imc
     *
     * @access public
     * @return float 
     */
    public function getImc()
    {
        return $this->imc;
    }

    /**
     * Set imcRef
     *
     * @access public
     * @param float $imcRef
     * @return Measurement
     */
    public function setImcRef($imcRef = null)
    {
        $this->imcRef = $imcRef;
        return $this;
    }

    /**
     * Get imcRef
     *
     * @access public
     * @return float 
     */
    public function getImcRef()
    {
        return $this->imcRef;
    }

    /**
     * Set imcRefInf
     *
     * @access public
     * @param float $imcRefInf
     * @return Measurement
     */
    public function setImcRefInf($imcRefInf = null)
    {
        $this->imcRefInf = $imcRefInf;
        return $this;
    }

    /**
     * Get imcRefInf
     *
     * @access public
     * @return float 
     */
    public function getImcRefInf()
    {
        return $this->imcRefInf;
    }

    /**
     * Set imcRefSup
     *
     * @access public
     * @param float $imcRefSup
     * @return Measurement
     */
    public function setImcRefSup($imcRefSup = null)
    {
        $this->imcRefSup = $imcRefSup;
        return $this;
    }

    /**
     * Get imcRefSup
     *
     * @access public
     * @return float 
     */
    public function getImcRefSup()
    {
        return $this->imcRefSup;
    }

    /**
     * Set fmPcRef
     *
     * @access public
     * @param float $fmPcRef
     * @return Measurement
     */
    public function setFmPcRef($fmPcRef = null)
    {
        $this->fmPcRef = $fmPcRef;
        return $this;
    }

    /**
     * Get fmPcRef
     *
     * @access public
     * @return float 
     */
    public function getFmPcRef()
    {
        return $this->fmPcRef;
    }

    /**
     * Set tbw
     *
     * @access public
     * @param float $tbw
     * @return Measurement
     */
    public function setTbw($tbw = null)
    {
        $this->tbw = $tbw;
        return $this;
    }

    /**
     * Get tbw
     *
     * @access public
     * @return float 
     */
    public function getTbw()
    {
        return $this->tbw;
    }

    /**
     * Set ecw
     *
     * @access public
     * @param float $ecw
     * @return Measurement
     */
    public function setEcw($ecw = null)
    {
        $this->ecw = $ecw;
        return $this;
    }

    /**
     * Get ecw
     *
     * @access public
     * @return float 
     */
    public function getEcw()
    {
        return $this->ecw;
    }

    /**
     * Set bmci
     *
     * @access public
     * @param float $bmci
     * @return Measurement
     */
    public function setBmci($bmci = null)
    {
        $this->bmci = $bmci;
        return $this;
    }

    /**
     * Get bmci
     *
     * @access public
     * @return float 
     */
    public function getBmci()
    {
        return $this->bmci;
    }

    /**
     * Set fmHcRefKg
     *
     * @access public
     * @param float $fmHcRefKg
     * @return Measurement
     */
    public function setFmHcRefKg($fmHcRefKg = null)
    {
        $this->fmHcRefKg = $fmHcRefKg;
        return $this;
    }

    /**
     * Get fmHcRefKg
     *
     * @access public
     * @return float 
     */
    public function getFmHcRefKg()
    {
        return $this->fmHcRefKg;
    }

    /**
     * Set fmRefKg
     *
     * @access public
     * @param float $fmRefKg
     * @return Measurement
     */
    public function setFmRefKg($fmRefKg = null)
    {
        $this->fmRefKg = $fmRefKg;
        return $this;
    }

    /**
     * Get fmRefKg
     *
     * @access public
     * @return float 
     */
    public function getFmRefKg()
    {
        return $this->fmRefKg;
    }

    /**
     * Set ffmKg
     *
     * @access public
     * @param float $ffmKg
     * @return Measurement
     */
    public function setFfmKg($ffmKg = null)
    {
        $this->ffmKg = $ffmKg;
        return $this;
    }

    /**
     * Get ffmKg
     *
     * @access public
     * @return float 
     */
    public function getFfmKg()
    {
        return $this->ffmKg;
    }

    /**
     * Set fmKg
     *
     * @access public
     * @param float $fmKg
     * @return Measurement
     */
    public function setFmKg($fmKg = null)
    {
        $this->fmKg = $fmKg;
        return $this;
    }

    /**
     * Get fmKg
     *
     * @access public
     * @return float 
     */
    public function getFmKg()
    {
        return $this->fmKg;
    }

    /**
     * Set ffmPc
     *
     * @access public
     * @param float $ffmPc
     * @return Measurement
     */
    public function setFfmPc($ffmPc = null)
    {
        $this->ffmPc = $ffmPc;
        return $this;
    }

    /**
     * Get ffmPc
     *
     * @access public
     * @return float 
     */
    public function getFfmPc()
    {
        return $this->ffmPc;
    }

    /**
     * Set dffmKg
     *
     * @access public
     * @param float $dffmKg
     * @return Measurement
     */
    public function setDffmKg($dffmKg = null)
    {
        $this->dffmKg = $dffmKg;
        return $this;
    }

    /**
     * Get dffmKg
     *
     * @access public
     * @return float 
     */
    public function getDffmKg()
    {
        return $this->dffmKg;
    }

    /**
     * Set dffmRefKg
     *
     * @access public
     * @param float $dffmRefKg
     * @return Measurement
     */
    public function setDffmRefKg($dffmRefKg = null)
    {
        $this->dffmRefKg = $dffmRefKg;
        return $this;
    }

    /**
     * Get dffmRefKg
     *
     * @access public
     * @return float 
     */
    public function getDffmRefKg()
    {
        return $this->dffmRefKg;
    }

    /**
     * Set dffmEtKg
     *
     * @access public
     * @param float $dffmEtKg
     * @return Measurement
     */
    public function setDffmEtKg($dffmEtKg = null)
    {
        $this->dffmEtKg = $dffmEtKg;
        return $this;
    }

    /**
     * Get dffmEtKg
     *
     * @access public
     * @return float 
     */
    public function getDffmEtKg()
    {
        return $this->dffmEtKg;
    }

    /**
     * Set asmmKg
     *
     * @access public
     * @param float $asmmKg
     * @return Measurement
     */
    public function setAsmmKg($asmmKg = null)
    {
        $this->asmmKg = $asmmKg;
        return $this;
    }

    /**
     * Get asmmKg
     *
     * @access public
     * @return float 
     */
    public function getAsmmKg()
    {
        return $this->asmmKg;
    }

    /**
     * Set asmmRef
     *
     * @access public
     * @param float $asmmRef
     * @return Measurement
     */
    public function setAsmmRef($asmmRef = null)
    {
        $this->asmmRef = $asmmRef;
        return $this;
    }

    /**
     * Get asmmRef
     *
     * @access public
     * @return float 
     */
    public function getAsmmRef()
    {
        return $this->asmmRef;
    }

    /**
     * Set asmmEt
     *
     * @access public
     * @param float $asmmEt
     * @return Measurement
     */
    public function setAsmmEt($asmmEt = null)
    {
        $this->asmmEt = $asmmEt;
        return $this;
    }

    /**
     * Get asmmEt
     *
     * @access public
     * @return float 
     */
    public function getAsmmEt()
    {
        return $this->asmmEt;
    }

    /**
     * Set asmmffmr
     *
     * @access public
     * @param float $asmmffmr
     * @return Measurement
     */
    public function setAsmmffmr($asmmffmr = null)
    {
        $this->asmmffmr = $asmmffmr;
        return $this;
    }

    /**
     * Get asmmffmr
     *
     * @access public
     * @return float 
     */
    public function getAsmmffmr()
    {
        return $this->asmmffmr;
    }

    /**
     * Set tbwPc
     *
     * @access public
     * @param float $tbwPc
     * @return Measurement
     */
    public function setTbwPc($tbwPc = null)
    {
        $this->tbwPc = $tbwPc;
        return $this;
    }

    /**
     * Get tbwPc
     *
     * @access public
     * @return float 
     */
    public function getTbwPc()
    {
        return $this->tbwPc;
    }

    /**
     * Set tbwffmPc
     *
     * @access public
     * @param float $tbwffmPc
     * @return Measurement
     */
    public function setTbwffmPc($tbwffmPc = null)
    {
        $this->tbwffmPc = $tbwffmPc;
        return $this;
    }

    /**
     * Get tbwffmPc
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPc()
    {
        return $this->tbwffmPc;
    }

    /**
     * Set tbwffmPcRef
     *
     * @access public
     * @param float $tbwffmPcRef
     * @return Measurement
     */
    public function setTbwffmPcRef($tbwffmPcRef = null)
    {
        $this->tbwffmPcRef = $tbwffmPcRef;
        return $this;
    }

    /**
     * Get tbwffmPcRef
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcRef()
    {
        return $this->tbwffmPcRef;
    }

    /**
     * Set tbwffmPcEt
     *
     * @access public
     * @param float $tbwffmPcEt
     * @return Measurement
     */
    public function setTbwffmPcEt($tbwffmPcEt = null)
    {
        $this->tbwffmPcEt = $tbwffmPcEt;
        return $this;
    }

    /**
     * Get tbwffmPcEt
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcEt()
    {
        return $this->tbwffmPcEt;
    }

    /**
     * Set ffwPc
     *
     * @access public
     * @param float $ffwPc
     * @return Measurement
     */
    public function setFfwPc($ffwPc = null)
    {
        $this->ffwPc = $ffwPc;
        return $this;
    }

    /**
     * Get ffwPc
     *
     * @access public
     * @return float 
     */
    public function getFfwPc()
    {
        return $this->ffwPc;
    }

    /**
     * Set ffw
     *
     * @access public
     * @param float $ffw
     * @return Measurement
     */
    public function setFfw($ffw = null)
    {
        $this->ffw = $ffw;
        return $this;
    }

    /**
     * Get ffw
     *
     * @access public
     * @return float 
     */
    public function getFfw()
    {
        return $this->ffw;
    }

    /**
     * Set ffwPcRef
     *
     * @access public
     * @param float $ffwPcRef
     * @return Measurement
     */
    public function setFfwPcRef($ffwPcRef = null)
    {
        $this->ffwPcRef = $ffwPcRef;
        return $this;
    }

    /**
     * Get ffwPcRef
     *
     * @access public
     * @return float 
     */
    public function getFfwPcRef()
    {
        return $this->ffwPcRef;
    }

    /**
     * Set ffwRef
     *
     * @access public
     * @param float $ffwRef
     * @return Measurement
     */
    public function setFfwRef($ffwRef = null)
    {
        $this->ffwRef = $ffwRef;
        return $this;
    }

    /**
     * Get ffwRef
     *
     * @access public
     * @return float 
     */
    public function getFfwRef()
    {
        return $this->ffwRef;
    }

    /**
     * Set ffwEt
     *
     * @access public
     * @param float $ffwEt
     * @return Measurement
     */
    public function setFfwEt($ffwEt = null)
    {
        $this->ffwEt = $ffwEt;
        return $this;
    }

    /**
     * Get ffwEt
     *
     * @access public
     * @return float 
     */
    public function getFfwEt()
    {
        return $this->ffwEt;
    }

    /**
     * Set ecwSpec
     *
     * @access public
     * @param float $ecwSpec
     * @return Measurement
     */
    public function setEcwSpec($ecwSpec = null)
    {
        $this->ecwSpec = $ecwSpec;
        return $this;
    }

    /**
     * Get ecwSpec
     *
     * @access public
     * @return float 
     */
    public function getEcwSpec()
    {
        return $this->ecwSpec;
    }

    /**
     * Set ecwPc
     *
     * @access public
     * @param float $ecwPc
     * @return Measurement
     */
    public function setEcwPc($ecwPc = null)
    {
        $this->ecwPc = $ecwPc;
        return $this;
    }

    /**
     * Get ecwPc
     *
     * @access public
     * @return float 
     */
    public function getEcwPc()
    {
        return $this->ecwPc;
    }

    /**
     * Set ecwffmPc
     *
     * @access public
     * @param float $ecwffmPc
     * @return Measurement
     */
    public function setEcwffmPc($ecwffmPc = null)
    {
        $this->ecwffmPc = $ecwffmPc;
        return $this;
    }

    /**
     * Get ecwffmPc
     *
     * @access public
     * @return float 
     */
    public function getEcwffmPc()
    {
        return $this->ecwffmPc;
    }

    /**
     * Set icw
     *
     * @access public
     * @param float $icw
     * @return Measurement
     */
    public function setIcw($icw = null)
    {
        $this->icw = $icw;
        return $this;
    }

    /**
     * Get icw
     *
     * @access public
     * @return float 
     */
    public function getIcw()
    {
        return $this->icw;
    }

    /**
     * Set icwPc
     *
     * @access public
     * @param float $icwPc
     * @return Measurement
     */
    public function setIcwPc($icwPc = null)
    {
        $this->icwPc = $icwPc;
        return $this;
    }

    /**
     * Get icwPc
     *
     * @access public
     * @return float 
     */
    public function getIcwPc()
    {
        return $this->icwPc;
    }

    /**
     * Set fficwPcRef
     *
     * @access public
     * @param float $fficwPcRef
     * @return Measurement
     */
    public function setFficwPcRef($fficwPcRef = null)
    {
        $this->fficwPcRef = $fficwPcRef;
        return $this;
    }

    /**
     * Get fficwPcRef
     *
     * @access public
     * @return float 
     */
    public function getFficwPcRef()
    {
        return $this->fficwPcRef;
    }

    /**
     * Set fficwRef
     *
     * @access public
     * @param float $fficwRef
     * @return Measurement
     */
    public function setFficwRef($fficwRef = null)
    {
        $this->fficwRef = $fficwRef;
        return $this;
    }

    /**
     * Get fficwRef
     *
     * @access public
     * @return float 
     */
    public function getFficwRef()
    {
        return $this->fficwRef;
    }

    /**
     * Set ffecwRef
     *
     * @access public
     * @param float $ffecwRef
     * @return Measurement
     */
    public function setFfecwRef($ffecwRef = null)
    {
        $this->ffecwRef = $ffecwRef;
        return $this;
    }

    /**
     * Get ffecwRef
     *
     * @access public
     * @return float 
     */
    public function getFfecwRef()
    {
        return $this->ffecwRef;
    }

    /**
     * Set ffecwPcRef
     *
     * @access public
     * @param float $ffecwPcRef
     * @return Measurement
     */
    public function setFfecwPcRef($ffecwPcRef = null)
    {
        $this->ffecwPcRef = $ffecwPcRef;
        return $this;
    }

    /**
     * Get ffecwPcRef
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcRef()
    {
        return $this->ffecwPcRef;
    }

    /**
     * Set ecwicwPcEt
     *
     * @access public
     * @param float $ecwicwPcEt
     * @return Measurement
     */
    public function setEcwicwPcEt($ecwicwPcEt = null)
    {
        $this->ecwicwPcEt = $ecwicwPcEt;
        return $this;
    }

    /**
     * Get ecwicwPcEt
     *
     * @access public
     * @return float 
     */
    public function getEcwicwPcEt()
    {
        return $this->ecwicwPcEt;
    }

    /**
     * Set cmo
     *
     * @access public
     * @param float $cmo
     * @return Measurement
     */
    public function setCmo($cmo = null)
    {
        $this->cmo = $cmo;
        return $this;
    }

    /**
     * Get cmo
     *
     * @access public
     * @return float 
     */
    public function getCmo()
    {
        return $this->cmo;
    }

    /**
     * Set slm
     *
     * @access public
     * @param float $slm
     * @return Measurement
     */
    public function setSlm($slm = null)
    {
        $this->slm = $slm;
        return $this;
    }

    /**
     * Get slm
     *
     * @access public
     * @return float 
     */
    public function getSlm()
    {
        return $this->slm;
    }

    /**
     * Set mo
     *
     * @access public
     * @param float $mo
     * @return Measurement
     */
    public function setMo($mo = null)
    {
        $this->mo = $mo;
        return $this;
    }

    /**
     * Get mo
     *
     * @access public
     * @return float 
     */
    public function getMo()
    {
        return $this->mo;
    }

    /**
     * Set ecs
     *
     * @access public
     * @param float $ecs
     * @return Measurement
     */
    public function setEcs($ecs = null)
    {
        $this->ecs = $ecs;
        return $this;
    }

    /**
     * Get ecs
     *
     * @access public
     * @return float 
     */
    public function getEcs()
    {
        return $this->ecs;
    }

    /**
     * Set ms
     *
     * @access public
     * @param float $ms
     * @return Measurement
     */
    public function setMs($ms = null)
    {
        $this->ms = $ms;
        return $this;
    }

    /**
     * Get ms
     *
     * @access public
     * @return float 
     */
    public function getMs()
    {
        return $this->ms;
    }

    /**
     * Set smi
     *
     * @access public
     * @param float $smi
     * @return Measurement
     */
    public function setSmi($smi = null)
    {
        $this->smi = $smi;
        return $this;
    }

    /**
     * Get smi
     *
     * @access public
     * @return float 
     */
    public function getSmi()
    {
        return $this->smi;
    }

    /**
     * Set fmiIndiceComp
     *
     * @access public
     * @param float $fmiIndiceComp
     * @return Measurement
     */
    public function setFmiIndiceComp($fmiIndiceComp = null)
    {
        $this->fmiIndiceComp = $fmiIndiceComp;
        return $this;
    }

    /**
     * Get fmiIndiceComp
     *
     * @access public
     * @return float 
     */
    public function getFmiIndiceComp()
    {
        return $this->fmiIndiceComp;
    }

    /**
     * Set slmir
     *
     * @access public
     * @param float $slmir
     * @return Measurement
     */
    public function setSlmir($slmir = null)
    {
        $this->slmir = $slmir;
        return $this;
    }

    /**
     * Get slmir
     *
     * @access public
     * @return float 
     */
    public function getSlmir()
    {
        return $this->slmir;
    }

    /**
     * Set dasmmKg
     *
     * @access public
     * @param float $dasmmKg
     * @return Measurement
     */
    public function setDasmmKg($dasmmKg = null)
    {
        $this->dasmmKg = $dasmmKg;
        return $this;
    }

    /**
     * Get dasmmKg
     *
     * @access public
     * @return float 
     */
    public function getDasmmKg()
    {
        return $this->dasmmKg;
    }

    /**
     * Set ffeirRef
     *
     * @access public
     * @param float $ffeirRef
     * @return Measurement
     */
    public function setFfeirRef($ffeirRef = null)
    {
        $this->ffeirRef = $ffeirRef;
        return $this;
    }

    /**
     * Get ffeirRef
     *
     * @access public
     * @return float 
     */
    public function getFfeirRef()
    {
        return $this->ffeirRef;
    }

    /**
     * Set bmrRefKjoules
     *
     * @access public
     * @param float $bmrRefKjoules
     * @return Measurement
     */
    public function setBmrRefKjoules($bmrRefKjoules = null)
    {
        $this->bmrRefKjoules = $bmrRefKjoules;
        return $this;
    }

    /**
     * Get bmrRefKjoules
     *
     * @access public
     * @return float 
     */
    public function getBmrRefKjoules()
    {
        return $this->bmrRefKjoules;
    }

    /**
     * Set mmsPcRef
     *
     * @access public
     * @param float $mmsPcRef
     * @return Measurement
     */
    public function setMmsPcRef($mmsPcRef = null)
    {
        $this->mmsPcRef = $mmsPcRef;
        return $this;
    }

    /**
     * Get mmsPcRef
     *
     * @access public
     * @return float 
     */
    public function getMmsPcRef()
    {
        return $this->mmsPcRef;
    }

    /**
     * Set tbwFm
     *
     * @access public
     * @param float $tbwFm
     * @return Measurement
     */
    public function setTbwFm($tbwFm = null)
    {
        $this->tbwFm = $tbwFm;
        return $this;
    }

    /**
     * Get tbwFm
     *
     * @access public
     * @return float 
     */
    public function getTbwFm()
    {
        return $this->tbwFm;
    }

    /**
     * Set z200z5r
     *
     * @access public
     * @param float $z200z5r
     * @return Measurement
     */
    public function setZ200z5r($z200z5r = null)
    {
        $this->z200z5r = $z200z5r;
        return $this;
    }

    /**
     * Get z200z5r
     *
     * @access public
     * @return float 
     */
    public function getZ200z5r()
    {
        return $this->z200z5r;
    }

    /**
     * Set whr
     *
     * @access public
     * @param float $whr
     * @return Measurement
     */
    public function setWhr($whr = null)
    {
        $this->whr = $whr;
        return $this;
    }

    /**
     * Get whr
     *
     * @access public
     * @return float 
     */
    public function getWhr()
    {
        return $this->whr;
    }

    /**
     * Set whtr
     *
     * @access public
     * @param float $whtr
     * @return Measurement
     */
    public function setWhtr($whtr = null)
    {
        $this->whtr = $whtr;
        return $this;
    }

    /**
     * Get whtr
     *
     * @access public
     * @return float 
     */
    public function getWhtr()
    {
        return $this->whtr;
    }

    /**
     * Set whtrRef
     *
     * @access public
     * @param float $whtrRef
     * @return Measurement
     */
    public function setWhtrRef($whtrRef = null)
    {
        $this->whtrRef = $whtrRef;
        return $this;
    }

    /**
     * Get whtrRef
     *
     * @access public
     * @return float 
     */
    public function getWhtrRef()
    {
        return $this->whtrRef;
    }

    /**
     * Set bmr
     *
     * @access public
     * @param float $bmr
     * @return Measurement
     */
    public function setBmr($bmr = null)
    {
        $this->bmr = $bmr;
        return $this;
    }

    /**
     * Get bmr
     *
     * @access public
     * @return float 
     */
    public function getBmr()
    {
        return $this->bmr;
    }

    /**
     * Set bmrKjoules
     *
     * @access public
     * @param float $bmrKjoules
     * @return Measurement
     */
    public function setBmrKjoules($bmrKjoules = null)
    {
        $this->bmrKjoules = $bmrKjoules;
        return $this;
    }

    /**
     * Get bmrKjoules
     *
     * @access public
     * @return float 
     */
    public function getBmrKjoules()
    {
        return $this->bmrKjoules;
    }

    /**
     * Set adcr
     *
     * @access public
     * @param float $adcr
     * @return Measurement
     */
    public function setAdcr($adcr = null)
    {
        $this->adcr = $adcr;
        return $this;
    }

    /**
     * Get adcr
     *
     * @access public
     * @return float 
     */
    public function getAdcr()
    {
        return $this->adcr;
    }

    /**
     * Set adcrKjoules
     *
     * @access public
     * @param float $adcrKjoules
     * @return Measurement
     */
    public function setAdcrKjoules($adcrKjoules = null)
    {
        $this->adcrKjoules = $adcrKjoules;
        return $this;
    }

    /**
     * Get adcrKjoules
     *
     * @access public
     * @return float 
     */
    public function getAdcrKjoules()
    {
        return $this->adcrKjoules;
    }

    /**
     * Set fmHcPc
     *
     * @access public
     * @param float $fmHcPc
     * @return Measurement
     */
    public function setFmHcPc($fmHcPc = null)
    {
        $this->fmHcPc = $fmHcPc;
        return $this;
    }

    /**
     * Get fmHcPc
     *
     * @access public
     * @return float 
     */
    public function getFmHcPc()
    {
        return $this->fmHcPc;
    }

    /**
     * Set fmHcKg
     *
     * @access public
     * @param float $fmHcKg
     * @return Measurement
     */
    public function setFmHcKg($fmHcKg = null)
    {
        $this->fmHcKg = $fmHcKg;
        return $this;
    }

    /**
     * Get fmHcKg
     *
     * @access public
     * @return float 
     */
    public function getFmHcKg()
    {
        return $this->fmHcKg;
    }

    /**
     * Set fmHcPcRef
     *
     * @access public
     * @param float $fmHcPcRef
     * @return Measurement
     */
    public function setFmHcPcRef($fmHcPcRef = null)
    {
        $this->fmHcPcRef = $fmHcPcRef;
        return $this;
    }

    /**
     * Get fmHcPcRef
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcRef()
    {
        return $this->fmHcPcRef;
    }

    /**
     * Set fmHcEtKg
     *
     * @access public
     * @param float $fmHcEtKg
     * @return Measurement
     */
    public function setFmHcEtKg($fmHcEtKg = null)
    {
        $this->fmHcEtKg = $fmHcEtKg;
        return $this;
    }

    /**
     * Get fmHcEtKg
     *
     * @access public
     * @return float 
     */
    public function getFmHcEtKg()
    {
        return $this->fmHcEtKg;
    }

    /**
     * Set fmEtKg
     *
     * @access public
     * @param float $fmEtKg
     * @return Measurement
     */
    public function setFmEtKg($fmEtKg = null)
    {
        $this->fmEtKg = $fmEtKg;
        return $this;
    }

    /**
     * Get fmEtKg
     *
     * @access public
     * @return float 
     */
    public function getFmEtKg()
    {
        return $this->fmEtKg;
    }

    /**
     * Set fmPc
     *
     * @access public
     * @param float $fmPc
     * @return Measurement
     */
    public function setFmPc($fmPc = null)
    {
        $this->fmPc = $fmPc;
        return $this;
    }

    /**
     * Get fmPc
     *
     * @access public
     * @return float 
     */
    public function getFmPc()
    {
        return $this->fmPc;
    }

    /**
     * Set mmsKg
     *
     * @access public
     * @param float $mmsKg
     * @return Measurement
     */
    public function setMmsKg($mmsKg = null)
    {
        $this->mmsKg = $mmsKg;
        return $this;
    }

    /**
     * Get mmsKg
     *
     * @access public
     * @return float 
     */
    public function getMmsKg()
    {
        return $this->mmsKg;
    }

    /**
     * Set mmsPc
     *
     * @access public
     * @param float $mmsPc
     * @return Measurement
     */
    public function setMmsPc($mmsPc = null)
    {
        $this->mmsPc = $mmsPc;
        return $this;
    }

    /**
     * Get mmsPc
     *
     * @access public
     * @return float 
     */
    public function getMmsPc()
    {
        return $this->mmsPc;
    }

    /**
     * Set mmsRefKg
     *
     * @access public
     * @param float $mmsRefKg
     * @return Measurement
     */
    public function setMmsRefKg($mmsRefKg = null)
    {
        $this->mmsRefKg = $mmsRefKg;
        return $this;
    }

    /**
     * Get mmsRefKg
     *
     * @access public
     * @return float 
     */
    public function getMmsRefKg()
    {
        return $this->mmsRefKg;
    }

    /**
     * Set mmsEtKg
     *
     * @access public
     * @param float $mmsEtKg
     * @return Measurement
     */
    public function setMmsEtKg($mmsEtKg = null)
    {
        $this->mmsEtKg = $mmsEtKg;
        return $this;
    }

    /**
     * Get mmsEtKg
     *
     * @access public
     * @return float 
     */
    public function getMmsEtKg()
    {
        return $this->mmsEtKg;
    }

    /**
     * Set bcm
     *
     * @access public
     * @param float $bcm
     * @return Measurement
     */
    public function setBcm($bcm = null)
    {
        $this->bcm = $bcm;
        return $this;
    }

    /**
     * Get bcm
     *
     * @access public
     * @return float 
     */
    public function getBcm()
    {
        return $this->bcm;
    }

    /**
     * Set mpMetaKg
     *
     * @access public
     * @param float $mpMetaKg
     * @return Measurement
     */
    public function setMpMetaKg($mpMetaKg = null)
    {
        $this->mpMetaKg = $mpMetaKg;
        return $this;
    }

    /**
     * Get mpMetaKg
     *
     * @access public
     * @return float 
     */
    public function getMpMetaKg()
    {
        return $this->mpMetaKg;
    }

    /**
     * Set mpMetaPc
     *
     * @access public
     * @param float $mpMetaPc
     * @return Measurement
     */
    public function setMpMetaPc($mpMetaPc = null)
    {
        $this->mpMetaPc = $mpMetaPc;
        return $this;
    }

    /**
     * Get mpMetaPc
     *
     * @access public
     * @return float 
     */
    public function getMpMetaPc()
    {
        return $this->mpMetaPc;
    }

    /**
     * Set tbwRef
     *
     * @access public
     * @param float $tbwRef
     * @return Measurement
     */
    public function setTbwRef($tbwRef = null)
    {
        $this->tbwRef = $tbwRef;
        return $this;
    }

    /**
     * Get tbwRef
     *
     * @access public
     * @return float 
     */
    public function getTbwRef()
    {
        return $this->tbwRef;
    }

    /**
     * Set icwfm
     *
     * @access public
     * @param float $icwfm
     * @return Measurement
     */
    public function setIcwfm($icwfm = null)
    {
        $this->icwfm = $icwfm;
        return $this;
    }

    /**
     * Get icwfm
     *
     * @access public
     * @return float 
     */
    public function getIcwfm()
    {
        return $this->icwfm;
    }

    /**
     * Set ecwfm
     *
     * @access public
     * @param float $ecwfm
     * @return Measurement
     */
    public function setEcwfm($ecwfm = null)
    {
        $this->ecwfm = $ecwfm;
        return $this;
    }

    /**
     * Get ecwfm
     *
     * @access public
     * @return float 
     */
    public function getEcwfm()
    {
        return $this->ecwfm;
    }

    /**
     * Set fficw
     *
     * @access public
     * @param float $fficw
     * @return Measurement
     */
    public function setFficw($fficw = null)
    {
        $this->fficw = $fficw;
        return $this;
    }

    /**
     * Get fficw
     *
     * @access public
     * @return float 
     */
    public function getFficw()
    {
        return $this->fficw;
    }

    /**
     * Set ffecw
     *
     * @access public
     * @param float $ffecw
     * @return Measurement
     */
    public function setFfecw($ffecw = null)
    {
        $this->ffecw = $ffecw;
        return $this;
    }

    /**
     * Get ffecw
     *
     * @access public
     * @return float 
     */
    public function getFfecw()
    {
        return $this->ffecw;
    }

    /**
     * Set ffecwPc
     *
     * @access public
     * @param float $ffecwPc
     * @return Measurement
     */
    public function setFfecwPc($ffecwPc = null)
    {
        $this->ffecwPc = $ffecwPc;
        return $this;
    }

    /**
     * Get ffecwPc
     *
     * @access public
     * @return float 
     */
    public function getFfecwPc()
    {
        return $this->ffecwPc;
    }

    /**
     * Set fficwPc
     *
     * @access public
     * @param float $fficwPc
     * @return Measurement
     */
    public function setFficwPc($fficwPc = null)
    {
        $this->fficwPc = $fficwPc;
        return $this;
    }

    /**
     * Get fficwPc
     *
     * @access public
     * @return float 
     */
    public function getFficwPc()
    {
        return $this->fficwPc;
    }

    /**
     * Set fficwEt
     *
     * @access public
     * @param float $fficwEt
     * @return Measurement
     */
    public function setFficwEt($fficwEt = null)
    {
        $this->fficwEt = $fficwEt;
        return $this;
    }

    /**
     * Get fficwEt
     *
     * @access public
     * @return float 
     */
    public function getFficwEt()
    {
        return $this->fficwEt;
    }

    /**
     * Set ffecwEt
     *
     * @access public
     * @param float $ffecwEt
     * @return Measurement
     */
    public function setFfecwEt($ffecwEt = null)
    {
        $this->ffecwEt = $ffecwEt;
        return $this;
    }

    /**
     * Get ffecwEt
     *
     * @access public
     * @return float 
     */
    public function getFfecwEt()
    {
        return $this->ffecwEt;
    }

    /**
     * Set ffecwicwPcEt
     *
     * @access public
     * @param float $ffecwicwPcEt
     * @return Measurement
     */
    public function setFfecwicwPcEt($ffecwicwPcEt = null)
    {
        $this->ffecwicwPcEt = $ffecwicwPcEt;
        return $this;
    }

    /**
     * Get ffecwicwPcEt
     *
     * @access public
     * @return float 
     */
    public function getFfecwicwPcEt()
    {
        return $this->ffecwicwPcEt;
    }

    /**
     * Set ffeir
     *
     * @access public
     * @param float $ffeir
     * @return Measurement
     */
    public function setFfeir($ffeir = null)
    {
        $this->ffeir = $ffeir;
        return $this;
    }

    /**
     * Get ffeir
     *
     * @access public
     * @return float 
     */
    public function getFfeir()
    {
        return $this->ffeir;
    }

    /**
     * Set mp
     *
     * @access public
     * @param float $mp
     * @return Measurement
     */
    public function setMp($mp = null)
    {
        $this->mp = $mp;
        return $this;
    }

    /**
     * Get mp
     *
     * @access public
     * @return float 
     */
    public function getMp()
    {
        return $this->mp;
    }

    /**
     * Set mmhi
     *
     * @access public
     * @param float $mmhi
     * @return Measurement
     */
    public function setMmhi($mmhi = null)
    {
        $this->mmhi = $mmhi;
        return $this;
    }

    /**
     * Get mmhi
     *
     * @access public
     * @return float 
     */
    public function getMmhi()
    {
        return $this->mmhi;
    }

    /**
     * Set asmhi
     *
     * @access public
     * @param float $asmhi
     * @return Measurement
     */
    public function setAsmhi($asmhi = null)
    {
        $this->asmhi = $asmhi;
        return $this;
    }

    /**
     * Get asmhi
     *
     * @access public
     * @return float 
     */
    public function getAsmhi()
    {
        return $this->asmhi;
    }

    /**
     * Set asmli
     *
     * @access public
     * @param float $asmli
     * @return Measurement
     */
    public function setAsmli($asmli = null)
    {
        $this->asmli = $asmli;
        return $this;
    }

    /**
     * Get asmli
     *
     * @access public
     * @return float 
     */
    public function getAsmli()
    {
        return $this->asmli;
    }

    /**
     * Set bcmffmr
     *
     * @access public
     * @param float $bcmffmr
     * @return Measurement
     */
    public function setBcmffmr($bcmffmr = null)
    {
        $this->bcmffmr = $bcmffmr;
        return $this;
    }

    /**
     * Get bcmffmr
     *
     * @access public
     * @return float 
     */
    public function getBcmffmr()
    {
        return $this->bcmffmr;
    }

    /**
     * Set fmir
     *
     * @access public
     * @param float $fmir
     * @return Measurement
     */
    public function setFmir($fmir = null)
    {
        $this->fmir = $fmir;
        return $this;
    }

    /**
     * Get fmir
     *
     * @access public
     * @return float 
     */
    public function getFmir()
    {
        return $this->fmir;
    }

    /**
     * Set fmslmir
     *
     * @access public
     * @param float $fmslmir
     * @return Measurement
     */
    public function setFmslmir($fmslmir = null)
    {
        $this->fmslmir = $fmslmir;
        return $this;
    }

    /**
     * Get fmslmir
     *
     * @access public
     * @return float 
     */
    public function getFmslmir()
    {
        return $this->fmslmir;
    }

    /**
     * Set fmHcPcEt
     *
     * @access public
     * @param float $fmHcPcEt
     * @return Measurement
     */
    public function setFmHcPcEt($fmHcPcEt = null)
    {
        $this->fmHcPcEt = $fmHcPcEt;
        return $this;
    }

    /**
     * Get fmHcPcEt
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcEt()
    {
        return $this->fmHcPcEt;
    }

    /**
     * Set fmPcEt
     *
     * @access public
     * @param float $fmPcEt
     * @return Measurement
     */
    public function setFmPcEt($fmPcEt = null)
    {
        $this->fmPcEt = $fmPcEt;
        return $this;
    }

    /**
     * Get fmPcEt
     *
     * @access public
     * @return float 
     */
    public function getFmPcEt()
    {
        return $this->fmPcEt;
    }

    /**
     * Set fmi
     *
     * @access public
     * @param float $fmi
     * @return Measurement
     */
    public function setFmi($fmi = null)
    {
        $this->fmi = $fmi;
        return $this;
    }

    /**
     * Get fmi
     *
     * @access public
     * @return float 
     */
    public function getFmi()
    {
        return $this->fmi;
    }

    /**
     * Set ffecwRefDivFfecw
     *
     * @access public
     * @param float $ffecwRefDivFfecw
     * @return Measurement
     */
    public function setFfecwRefDivFfecw($ffecwRefDivFfecw = null)
    {
        $this->ffecwRefDivFfecw = $ffecwRefDivFfecw;
        return $this;
    }

    /**
     * Get ffecwRefDivFfecw
     *
     * @access public
     * @return float 
     */
    public function getFfecwRefDivFfecw()
    {
        return $this->ffecwRefDivFfecw;
    }

    /**
     * Set fficwRefDivFficw
     *
     * @access public
     * @param float $fficwRefDivFficw
     * @return Measurement
     */
    public function setFficwRefDivFficw($fficwRefDivFficw = null)
    {
        $this->fficwRefDivFficw = $fficwRefDivFficw;
        return $this;
    }

    /**
     * Get fficwRefDivFficw
     *
     * @access public
     * @return float 
     */
    public function getFficwRefDivFficw()
    {
        return $this->fficwRefDivFficw;
    }

    /**
     * Set icwEt
     *
     * @access public
     * @param float $icwEt
     * @return Measurement
     */
    public function setIcwEt($icwEt = null)
    {
        $this->icwEt = $icwEt;
        return $this;
    }

    /**
     * Get icwEt
     *
     * @access public
     * @return float 
     */
    public function getIcwEt()
    {
        return $this->icwEt;
    }

    /**
     * Set bmrEt
     *
     * @access public
     * @param float $bmrEt
     * @return Measurement
     */
    public function setBmrEt($bmrEt = null)
    {
        $this->bmrEt = $bmrEt;
        return $this;
    }

    /**
     * Get bmrEt
     *
     * @access public
     * @return float 
     */
    public function getBmrEt()
    {
        return $this->bmrEt;
    }

    /**
     * Set mmsPcEt
     *
     * @access public
     * @param float $mmsPcEt
     * @return Measurement
     */
    public function setMmsPcEt($mmsPcEt = null)
    {
        $this->mmsPcEt = $mmsPcEt;
        return $this;
    }

    /**
     * Get mmsPcEt
     *
     * @access public
     * @return float 
     */
    public function getMmsPcEt()
    {
        return $this->mmsPcEt;
    }

    /**
     * Set tbe
     *
     * @access public
     * @param float $tbe
     * @return Measurement
     */
    public function setTbe($tbe = null)
    {
        $this->tbe = $tbe;
        return $this;
    }

    /**
     * Get tbe
     *
     * @access public
     * @return float 
     */
    public function getTbe()
    {
        return $this->tbe;
    }

    /**
     * Set cmoRef
     *
     * @access public
     * @param float $cmoRef
     * @return Measurement
     */
    public function setCmoRef($cmoRef = null)
    {
        $this->cmoRef = $cmoRef;
        return $this;
    }

    /**
     * Get cmoRef
     *
     * @access public
     * @return float 
     */
    public function getCmoRef()
    {
        return $this->cmoRef;
    }

    /**
     * Set cmoEt
     *
     * @access public
     * @param float $cmoEt
     * @return Measurement
     */
    public function setCmoEt($cmoEt = null)
    {
        $this->cmoEt = $cmoEt;
        return $this;
    }

    /**
     * Get cmoEt
     *
     * @access public
     * @return float 
     */
    public function getCmoEt()
    {
        return $this->cmoEt;
    }

    /**
     * Set slmRef
     *
     * @access public
     * @param float $slmRef
     * @return Measurement
     */
    public function setSlmRef($slmRef = null)
    {
        $this->slmRef = $slmRef;
        return $this;
    }

    /**
     * Get slmRef
     *
     * @access public
     * @return float 
     */
    public function getSlmRef()
    {
        return $this->slmRef;
    }

    /**
     * Set asmtli
     *
     * @access public
     * @param float $asmtli
     * @return Measurement
     */
    public function setAsmtli($asmtli = null)
    {
        $this->asmtli = $asmtli;
        return $this;
    }

    /**
     * Get asmtli
     *
     * @access public
     * @return float 
     */
    public function getAsmtli()
    {
        return $this->asmtli;
    }

    /**
     * Set ecsRef
     *
     * @access public
     * @param float $ecsRef
     * @return Measurement
     */
    public function setEcsRef($ecsRef = null)
    {
        $this->ecsRef = $ecsRef;
        return $this;
    }

    /**
     * Get ecsRef
     *
     * @access public
     * @return float 
     */
    public function getEcsRef()
    {
        return $this->ecsRef;
    }

    /**
     * Set mpMetaRef
     *
     * @access public
     * @param float $mpMetaRef
     * @return Measurement
     */
    public function setMpMetaRef($mpMetaRef = null)
    {
        $this->mpMetaRef = $mpMetaRef;
        return $this;
    }

    /**
     * Get mpMetaRef
     *
     * @access public
     * @return float 
     */
    public function getMpMetaRef()
    {
        return $this->mpMetaRef;
    }

    /**
     * Set bcmRef
     *
     * @access public
     * @param float $bcmRef
     * @return Measurement
     */
    public function setBcmRef($bcmRef = null)
    {
        $this->bcmRef = $bcmRef;
        return $this;
    }

    /**
     * Get bcmRef
     *
     * @access public
     * @return float 
     */
    public function getBcmRef()
    {
        return $this->bcmRef;
    }

    /**
     * Set bcmEt
     *
     * @access public
     * @param float $bcmEt
     * @return Measurement
     */
    public function setBcmEt($bcmEt = null)
    {
        $this->bcmEt = $bcmEt;
        return $this;
    }

    /**
     * Get bcmEt
     *
     * @access public
     * @return float 
     */
    public function getBcmEt()
    {
        return $this->bcmEt;
    }

    /**
     * Set mpRef
     *
     * @access public
     * @param float $mpRef
     * @return Measurement
     */
    public function setMpRef($mpRef = null)
    {
        $this->mpRef = $mpRef;
        return $this;
    }

    /**
     * Get mpRef
     *
     * @access public
     * @return float 
     */
    public function getMpRef()
    {
        return $this->mpRef;
    }

    /**
     * Set mpMetaEtKg
     *
     * @access public
     * @param float $mpMetaEtKg
     * @return Measurement
     */
    public function setMpMetaEtKg($mpMetaEtKg = null)
    {
        $this->mpMetaEtKg = $mpMetaEtKg;
        return $this;
    }

    /**
     * Get mpMetaEtKg
     *
     * @access public
     * @return float 
     */
    public function getMpMetaEtKg()
    {
        return $this->mpMetaEtKg;
    }

    /**
     * Set fmHcPc100
     *
     * @access public
     * @param float $fmHcPc100
     * @return Measurement
     */
    public function setFmHcPc100($fmHcPc100 = null)
    {
        $this->fmHcPc100 = $fmHcPc100;
        return $this;
    }

    /**
     * Get fmHcPc100
     *
     * @access public
     * @return float 
     */
    public function getFmHcPc100()
    {
        return $this->fmHcPc100;
    }

    /**
     * Set fmHcPcStdA
     *
     * @access public
     * @param float $fmHcPcStdA
     * @return Measurement
     */
    public function setFmHcPcStdA($fmHcPcStdA = null)
    {
        $this->fmHcPcStdA = $fmHcPcStdA;
        return $this;
    }

    /**
     * Get fmHcPcStdA
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdA()
    {
        return $this->fmHcPcStdA;
    }

    /**
     * Set fmHcPcStdB
     *
     * @access public
     * @param float $fmHcPcStdB
     * @return Measurement
     */
    public function setFmHcPcStdB($fmHcPcStdB = null)
    {
        $this->fmHcPcStdB = $fmHcPcStdB;
        return $this;
    }

    /**
     * Get fmHcPcStdB
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdB()
    {
        return $this->fmHcPcStdB;
    }

    /**
     * Set fmHcPcStdC
     *
     * @access public
     * @param float $fmHcPcStdC
     * @return Measurement
     */
    public function setFmHcPcStdC($fmHcPcStdC = null)
    {
        $this->fmHcPcStdC = $fmHcPcStdC;
        return $this;
    }

    /**
     * Get fmHcPcStdC
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdC()
    {
        return $this->fmHcPcStdC;
    }

    /**
     * Set fmHcPcStdD
     *
     * @access public
     * @param float $fmHcPcStdD
     * @return Measurement
     */
    public function setFmHcPcStdD($fmHcPcStdD = null)
    {
        $this->fmHcPcStdD = $fmHcPcStdD;
        return $this;
    }

    /**
     * Get fmHcPcStdD
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdD()
    {
        return $this->fmHcPcStdD;
    }

    /**
     * Set fmHcPcStdE
     *
     * @access public
     * @param float $fmHcPcStdE
     * @return Measurement
     */
    public function setFmHcPcStdE($fmHcPcStdE = null)
    {
        $this->fmHcPcStdE = $fmHcPcStdE;
        return $this;
    }

    /**
     * Get fmHcPcStdE
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdE()
    {
        return $this->fmHcPcStdE;
    }

    /**
     * Set fmHcPcStdF
     *
     * @access public
     * @param float $fmHcPcStdF
     * @return Measurement
     */
    public function setFmHcPcStdF($fmHcPcStdF = null)
    {
        $this->fmHcPcStdF = $fmHcPcStdF;
        return $this;
    }

    /**
     * Get fmHcPcStdF
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcStdF()
    {
        return $this->fmHcPcStdF;
    }

    /**
     * Set fmHcPcZaMax
     *
     * @access public
     * @param float $fmHcPcZaMax
     * @return Measurement
     */
    public function setFmHcPcZaMax($fmHcPcZaMax = null)
    {
        $this->fmHcPcZaMax = $fmHcPcZaMax;
        return $this;
    }

    /**
     * Get fmHcPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZaMax()
    {
        return $this->fmHcPcZaMax;
    }

    /**
     * Set fmHcPcZaMaxColor
     *
     * @access public
     * @param string $fmHcPcZaMaxColor
     * @return Measurement
     */
    public function setFmHcPcZaMaxColor($fmHcPcZaMaxColor = null)
    {
        $this->fmHcPcZaMaxColor = $fmHcPcZaMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZaMaxColor()
    {
        return $this->fmHcPcZaMaxColor;
    }

    /**
     * Set fmHcPcZbMax
     *
     * @access public
     * @param float $fmHcPcZbMax
     * @return Measurement
     */
    public function setFmHcPcZbMax($fmHcPcZbMax = null)
    {
        $this->fmHcPcZbMax = $fmHcPcZbMax;
        return $this;
    }

    /**
     * Get fmHcPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZbMax()
    {
        return $this->fmHcPcZbMax;
    }

    /**
     * Set fmHcPcZbMaxColor
     *
     * @access public
     * @param string $fmHcPcZbMaxColor
     * @return Measurement
     */
    public function setFmHcPcZbMaxColor($fmHcPcZbMaxColor = null)
    {
        $this->fmHcPcZbMaxColor = $fmHcPcZbMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZbMaxColor()
    {
        return $this->fmHcPcZbMaxColor;
    }

    /**
     * Set fmHcPcZcMax
     *
     * @access public
     * @param float $fmHcPcZcMax
     * @return Measurement
     */
    public function setFmHcPcZcMax($fmHcPcZcMax = null)
    {
        $this->fmHcPcZcMax = $fmHcPcZcMax;
        return $this;
    }

    /**
     * Get fmHcPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZcMax()
    {
        return $this->fmHcPcZcMax;
    }

    /**
     * Set fmHcPcZcMaxColor
     *
     * @access public
     * @param string $fmHcPcZcMaxColor
     * @return Measurement
     */
    public function setFmHcPcZcMaxColor($fmHcPcZcMaxColor = null)
    {
        $this->fmHcPcZcMaxColor = $fmHcPcZcMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZcMaxColor()
    {
        return $this->fmHcPcZcMaxColor;
    }

    /**
     * Set fmHcPcZdMax
     *
     * @access public
     * @param float $fmHcPcZdMax
     * @return Measurement
     */
    public function setFmHcPcZdMax($fmHcPcZdMax = null)
    {
        $this->fmHcPcZdMax = $fmHcPcZdMax;
        return $this;
    }

    /**
     * Get fmHcPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZdMax()
    {
        return $this->fmHcPcZdMax;
    }

    /**
     * Set fmHcPcZdMaxColor
     *
     * @access public
     * @param string $fmHcPcZdMaxColor
     * @return Measurement
     */
    public function setFmHcPcZdMaxColor($fmHcPcZdMaxColor = null)
    {
        $this->fmHcPcZdMaxColor = $fmHcPcZdMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZdMaxColor()
    {
        return $this->fmHcPcZdMaxColor;
    }

    /**
     * Set fmHcPcZeMax
     *
     * @access public
     * @param float $fmHcPcZeMax
     * @return Measurement
     */
    public function setFmHcPcZeMax($fmHcPcZeMax = null)
    {
        $this->fmHcPcZeMax = $fmHcPcZeMax;
        return $this;
    }

    /**
     * Get fmHcPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZeMax()
    {
        return $this->fmHcPcZeMax;
    }

    /**
     * Set fmHcPcZeMaxColor
     *
     * @access public
     * @param string $fmHcPcZeMaxColor
     * @return Measurement
     */
    public function setFmHcPcZeMaxColor($fmHcPcZeMaxColor = null)
    {
        $this->fmHcPcZeMaxColor = $fmHcPcZeMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZeMaxColor()
    {
        return $this->fmHcPcZeMaxColor;
    }

    /**
     * Set fmHcPcZfMax
     *
     * @access public
     * @param float $fmHcPcZfMax
     * @return Measurement
     */
    public function setFmHcPcZfMax($fmHcPcZfMax = null)
    {
        $this->fmHcPcZfMax = $fmHcPcZfMax;
        return $this;
    }

    /**
     * Get fmHcPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZfMax()
    {
        return $this->fmHcPcZfMax;
    }

    /**
     * Set fmHcPcZfMaxColor
     *
     * @access public
     * @param string $fmHcPcZfMaxColor
     * @return Measurement
     */
    public function setFmHcPcZfMaxColor($fmHcPcZfMaxColor = null)
    {
        $this->fmHcPcZfMaxColor = $fmHcPcZfMaxColor;
        return $this;
    }

    /**
     * Get fmHcPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmHcPcZfMaxColor()
    {
        return $this->fmHcPcZfMaxColor;
    }

    /**
     * Set fmHcPcZone
     *
     * @access public
     * @param float $fmHcPcZone
     * @return Measurement
     */
    public function setFmHcPcZone($fmHcPcZone = null)
    {
        $this->fmHcPcZone = $fmHcPcZone;
        return $this;
    }

    /**
     * Get fmHcPcZone
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcZone()
    {
        return $this->fmHcPcZone;
    }

    /**
     * Set ffwPc100
     *
     * @access public
     * @param float $ffwPc100
     * @return Measurement
     */
    public function setFfwPc100($ffwPc100 = null)
    {
        $this->ffwPc100 = $ffwPc100;
        return $this;
    }

    /**
     * Get ffwPc100
     *
     * @access public
     * @return float 
     */
    public function getFfwPc100()
    {
        return $this->ffwPc100;
    }

    /**
     * Set ffwPcStdA
     *
     * @access public
     * @param float $ffwPcStdA
     * @return Measurement
     */
    public function setFfwPcStdA($ffwPcStdA = null)
    {
        $this->ffwPcStdA = $ffwPcStdA;
        return $this;
    }

    /**
     * Get ffwPcStdA
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdA()
    {
        return $this->ffwPcStdA;
    }

    /**
     * Set ffwPcStdB
     *
     * @access public
     * @param float $ffwPcStdB
     * @return Measurement
     */
    public function setFfwPcStdB($ffwPcStdB = null)
    {
        $this->ffwPcStdB = $ffwPcStdB;
        return $this;
    }

    /**
     * Get ffwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdB()
    {
        return $this->ffwPcStdB;
    }

    /**
     * Set ffwPcStdC
     *
     * @access public
     * @param float $ffwPcStdC
     * @return Measurement
     */
    public function setFfwPcStdC($ffwPcStdC = null)
    {
        $this->ffwPcStdC = $ffwPcStdC;
        return $this;
    }

    /**
     * Get ffwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdC()
    {
        return $this->ffwPcStdC;
    }

    /**
     * Set ffwPcStdD
     *
     * @access public
     * @param float $ffwPcStdD
     * @return Measurement
     */
    public function setFfwPcStdD($ffwPcStdD = null)
    {
        $this->ffwPcStdD = $ffwPcStdD;
        return $this;
    }

    /**
     * Get ffwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdD()
    {
        return $this->ffwPcStdD;
    }

    /**
     * Set ffwPcStdE
     *
     * @access public
     * @param float $ffwPcStdE
     * @return Measurement
     */
    public function setFfwPcStdE($ffwPcStdE = null)
    {
        $this->ffwPcStdE = $ffwPcStdE;
        return $this;
    }

    /**
     * Get ffwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdE()
    {
        return $this->ffwPcStdE;
    }

    /**
     * Set ffwPcStdF
     *
     * @access public
     * @param float $ffwPcStdF
     * @return Measurement
     */
    public function setFfwPcStdF($ffwPcStdF = null)
    {
        $this->ffwPcStdF = $ffwPcStdF;
        return $this;
    }

    /**
     * Get ffwPcStdF
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdF()
    {
        return $this->ffwPcStdF;
    }

    /**
     * Set ffwPcStdG
     *
     * @access public
     * @param float $ffwPcStdG
     * @return Measurement
     */
    public function setFfwPcStdG($ffwPcStdG = null)
    {
        $this->ffwPcStdG = $ffwPcStdG;
        return $this;
    }

    /**
     * Get ffwPcStdG
     *
     * @access public
     * @return float 
     */
    public function getFfwPcStdG()
    {
        return $this->ffwPcStdG;
    }

    /**
     * Set ffwPcZaMax
     *
     * @access public
     * @param float $ffwPcZaMax
     * @return Measurement
     */
    public function setFfwPcZaMax($ffwPcZaMax = null)
    {
        $this->ffwPcZaMax = $ffwPcZaMax;
        return $this;
    }

    /**
     * Get ffwPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZaMax()
    {
        return $this->ffwPcZaMax;
    }

    /**
     * Set ffwPcZaMaxColor
     *
     * @access public
     * @param string $ffwPcZaMaxColor
     * @return Measurement
     */
    public function setFfwPcZaMaxColor($ffwPcZaMaxColor = null)
    {
        $this->ffwPcZaMaxColor = $ffwPcZaMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZaMaxColor()
    {
        return $this->ffwPcZaMaxColor;
    }

    /**
     * Set ffwPcZbMax
     *
     * @access public
     * @param float $ffwPcZbMax
     * @return Measurement
     */
    public function setFfwPcZbMax($ffwPcZbMax = null)
    {
        $this->ffwPcZbMax = $ffwPcZbMax;
        return $this;
    }

    /**
     * Get ffwPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZbMax()
    {
        return $this->ffwPcZbMax;
    }

    /**
     * Set ffwPcZbMaxColor
     *
     * @access public
     * @param string $ffwPcZbMaxColor
     * @return Measurement
     */
    public function setFfwPcZbMaxColor($ffwPcZbMaxColor = null)
    {
        $this->ffwPcZbMaxColor = $ffwPcZbMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZbMaxColor()
    {
        return $this->ffwPcZbMaxColor;
    }

    /**
     * Set ffwPcZcMax
     *
     * @access public
     * @param float $ffwPcZcMax
     * @return Measurement
     */
    public function setFfwPcZcMax($ffwPcZcMax = null)
    {
        $this->ffwPcZcMax = $ffwPcZcMax;
        return $this;
    }

    /**
     * Get ffwPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZcMax()
    {
        return $this->ffwPcZcMax;
    }

    /**
     * Set ffwPcZcMaxColor
     *
     * @access public
     * @param string $ffwPcZcMaxColor
     * @return Measurement
     */
    public function setFfwPcZcMaxColor($ffwPcZcMaxColor = null)
    {
        $this->ffwPcZcMaxColor = $ffwPcZcMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZcMaxColor()
    {
        return $this->ffwPcZcMaxColor;
    }

    /**
     * Set ffwPcZdMax
     *
     * @access public
     * @param float $ffwPcZdMax
     * @return Measurement
     */
    public function setFfwPcZdMax($ffwPcZdMax = null)
    {
        $this->ffwPcZdMax = $ffwPcZdMax;
        return $this;
    }

    /**
     * Get ffwPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZdMax()
    {
        return $this->ffwPcZdMax;
    }

    /**
     * Set ffwPcZdMaxColor
     *
     * @access public
     * @param string $ffwPcZdMaxColor
     * @return Measurement
     */
    public function setFfwPcZdMaxColor($ffwPcZdMaxColor = null)
    {
        $this->ffwPcZdMaxColor = $ffwPcZdMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZdMaxColor()
    {
        return $this->ffwPcZdMaxColor;
    }

    /**
     * Set ffwPcZeMax
     *
     * @access public
     * @param float $ffwPcZeMax
     * @return Measurement
     */
    public function setFfwPcZeMax($ffwPcZeMax = null)
    {
        $this->ffwPcZeMax = $ffwPcZeMax;
        return $this;
    }

    /**
     * Get ffwPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZeMax()
    {
        return $this->ffwPcZeMax;
    }

    /**
     * Set ffwPcZeMaxColor
     *
     * @access public
     * @param string $ffwPcZeMaxColor
     * @return Measurement
     */
    public function setFfwPcZeMaxColor($ffwPcZeMaxColor = null)
    {
        $this->ffwPcZeMaxColor = $ffwPcZeMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZeMaxColor()
    {
        return $this->ffwPcZeMaxColor;
    }

    /**
     * Set ffwPcZfMax
     *
     * @access public
     * @param float $ffwPcZfMax
     * @return Measurement
     */
    public function setFfwPcZfMax($ffwPcZfMax = null)
    {
        $this->ffwPcZfMax = $ffwPcZfMax;
        return $this;
    }

    /**
     * Get ffwPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZfMax()
    {
        return $this->ffwPcZfMax;
    }

    /**
     * Set ffwPcZfMaxColor
     *
     * @access public
     * @param string $ffwPcZfMaxColor
     * @return Measurement
     */
    public function setFfwPcZfMaxColor($ffwPcZfMaxColor = null)
    {
        $this->ffwPcZfMaxColor = $ffwPcZfMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZfMaxColor()
    {
        return $this->ffwPcZfMaxColor;
    }

    /**
     * Set ffwPcZgMax
     *
     * @access public
     * @param float $ffwPcZgMax
     * @return Measurement
     */
    public function setFfwPcZgMax($ffwPcZgMax = null)
    {
        $this->ffwPcZgMax = $ffwPcZgMax;
        return $this;
    }

    /**
     * Get ffwPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZgMax()
    {
        return $this->ffwPcZgMax;
    }

    /**
     * Set ffwPcZgMaxColor
     *
     * @access public
     * @param string $ffwPcZgMaxColor
     * @return Measurement
     */
    public function setFfwPcZgMaxColor($ffwPcZgMaxColor = null)
    {
        $this->ffwPcZgMaxColor = $ffwPcZgMaxColor;
        return $this;
    }

    /**
     * Get ffwPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfwPcZgMaxColor()
    {
        return $this->ffwPcZgMaxColor;
    }

    /**
     * Set ffwPcZone
     *
     * @access public
     * @param float $ffwPcZone
     * @return Measurement
     */
    public function setFfwPcZone($ffwPcZone = null)
    {
        $this->ffwPcZone = $ffwPcZone;
        return $this;
    }

    /**
     * Get ffwPcZone
     *
     * @access public
     * @return float 
     */
    public function getFfwPcZone()
    {
        return $this->ffwPcZone;
    }

    /**
     * Set mmhiStdA
     *
     * @access public
     * @param float $mmhiStdA
     * @return Measurement
     */
    public function setMmhiStdA($mmhiStdA = null)
    {
        $this->mmhiStdA = $mmhiStdA;
        return $this;
    }

    /**
     * Get mmhiStdA
     *
     * @access public
     * @return float 
     */
    public function getMmhiStdA()
    {
        return $this->mmhiStdA;
    }

    /**
     * Set mmhiStdB
     *
     * @access public
     * @param float $mmhiStdB
     * @return Measurement
     */
    public function setMmhiStdB($mmhiStdB = null)
    {
        $this->mmhiStdB = $mmhiStdB;
        return $this;
    }

    /**
     * Get mmhiStdB
     *
     * @access public
     * @return float 
     */
    public function getMmhiStdB()
    {
        return $this->mmhiStdB;
    }

    /**
     * Set mmhiStdC
     *
     * @access public
     * @param float $mmhiStdC
     * @return Measurement
     */
    public function setMmhiStdC($mmhiStdC = null)
    {
        $this->mmhiStdC = $mmhiStdC;
        return $this;
    }

    /**
     * Get mmhiStdC
     *
     * @access public
     * @return float 
     */
    public function getMmhiStdC()
    {
        return $this->mmhiStdC;
    }

    /**
     * Set mmhiStdD
     *
     * @access public
     * @param float $mmhiStdD
     * @return Measurement
     */
    public function setMmhiStdD($mmhiStdD = null)
    {
        $this->mmhiStdD = $mmhiStdD;
        return $this;
    }

    /**
     * Get mmhiStdD
     *
     * @access public
     * @return float 
     */
    public function getMmhiStdD()
    {
        return $this->mmhiStdD;
    }

    /**
     * Set mmhiZaMax
     *
     * @access public
     * @param float $mmhiZaMax
     * @return Measurement
     */
    public function setMmhiZaMax($mmhiZaMax = null)
    {
        $this->mmhiZaMax = $mmhiZaMax;
        return $this;
    }

    /**
     * Get mmhiZaMax
     *
     * @access public
     * @return float 
     */
    public function getMmhiZaMax()
    {
        return $this->mmhiZaMax;
    }

    /**
     * Set mmhiZaMaxColor
     *
     * @access public
     * @param string $mmhiZaMaxColor
     * @return Measurement
     */
    public function setMmhiZaMaxColor($mmhiZaMaxColor = null)
    {
        $this->mmhiZaMaxColor = $mmhiZaMaxColor;
        return $this;
    }

    /**
     * Get mmhiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMmhiZaMaxColor()
    {
        return $this->mmhiZaMaxColor;
    }

    /**
     * Set mmhiZbMax
     *
     * @access public
     * @param float $mmhiZbMax
     * @return Measurement
     */
    public function setMmhiZbMax($mmhiZbMax = null)
    {
        $this->mmhiZbMax = $mmhiZbMax;
        return $this;
    }

    /**
     * Get mmhiZbMax
     *
     * @access public
     * @return float 
     */
    public function getMmhiZbMax()
    {
        return $this->mmhiZbMax;
    }

    /**
     * Set mmhiZbMaxColor
     *
     * @access public
     * @param string $mmhiZbMaxColor
     * @return Measurement
     */
    public function setMmhiZbMaxColor($mmhiZbMaxColor = null)
    {
        $this->mmhiZbMaxColor = $mmhiZbMaxColor;
        return $this;
    }

    /**
     * Get mmhiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMmhiZbMaxColor()
    {
        return $this->mmhiZbMaxColor;
    }

    /**
     * Set mmhiZcMax
     *
     * @access public
     * @param float $mmhiZcMax
     * @return Measurement
     */
    public function setMmhiZcMax($mmhiZcMax = null)
    {
        $this->mmhiZcMax = $mmhiZcMax;
        return $this;
    }

    /**
     * Get mmhiZcMax
     *
     * @access public
     * @return float 
     */
    public function getMmhiZcMax()
    {
        return $this->mmhiZcMax;
    }

    /**
     * Set mmhiZcMaxColor
     *
     * @access public
     * @param string $mmhiZcMaxColor
     * @return Measurement
     */
    public function setMmhiZcMaxColor($mmhiZcMaxColor = null)
    {
        $this->mmhiZcMaxColor = $mmhiZcMaxColor;
        return $this;
    }

    /**
     * Get mmhiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMmhiZcMaxColor()
    {
        return $this->mmhiZcMaxColor;
    }

    /**
     * Set mmhiZdMax
     *
     * @access public
     * @param float $mmhiZdMax
     * @return Measurement
     */
    public function setMmhiZdMax($mmhiZdMax = null)
    {
        $this->mmhiZdMax = $mmhiZdMax;
        return $this;
    }

    /**
     * Get mmhiZdMax
     *
     * @access public
     * @return float 
     */
    public function getMmhiZdMax()
    {
        return $this->mmhiZdMax;
    }

    /**
     * Set mmhiZdMaxColor
     *
     * @access public
     * @param string $mmhiZdMaxColor
     * @return Measurement
     */
    public function setMmhiZdMaxColor($mmhiZdMaxColor = null)
    {
        $this->mmhiZdMaxColor = $mmhiZdMaxColor;
        return $this;
    }

    /**
     * Get mmhiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMmhiZdMaxColor()
    {
        return $this->mmhiZdMaxColor;
    }

    /**
     * Set mmhiZone
     *
     * @access public
     * @param float $mmhiZone
     * @return Measurement
     */
    public function setMmhiZone($mmhiZone = null)
    {
        $this->mmhiZone = $mmhiZone;
        return $this;
    }

    /**
     * Get mmhiZone
     *
     * @access public
     * @return float 
     */
    public function getMmhiZone()
    {
        return $this->mmhiZone;
    }

    /**
     * Set fmHcPcInf
     *
     * @access public
     * @param float $fmHcPcInf
     * @return Measurement
     */
    public function setFmHcPcInf($fmHcPcInf = null)
    {
        $this->fmHcPcInf = $fmHcPcInf;
        return $this;
    }

    /**
     * Get fmHcPcInf
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcInf()
    {
        return $this->fmHcPcInf;
    }

    /**
     * Set adcrZaMax
     *
     * @access public
     * @param float $adcrZaMax
     * @return Measurement
     */
    public function setAdcrZaMax($adcrZaMax = null)
    {
        $this->adcrZaMax = $adcrZaMax;
        return $this;
    }

    /**
     * Get adcrZaMax
     *
     * @access public
     * @return float 
     */
    public function getAdcrZaMax()
    {
        return $this->adcrZaMax;
    }

    /**
     * Set adcrZaMaxColor
     *
     * @access public
     * @param string $adcrZaMaxColor
     * @return Measurement
     */
    public function setAdcrZaMaxColor($adcrZaMaxColor = null)
    {
        $this->adcrZaMaxColor = $adcrZaMaxColor;
        return $this;
    }

    /**
     * Get adcrZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAdcrZaMaxColor()
    {
        return $this->adcrZaMaxColor;
    }

    /**
     * Set adcrZbMax
     *
     * @access public
     * @param float $adcrZbMax
     * @return Measurement
     */
    public function setAdcrZbMax($adcrZbMax = null)
    {
        $this->adcrZbMax = $adcrZbMax;
        return $this;
    }

    /**
     * Get adcrZbMax
     *
     * @access public
     * @return float 
     */
    public function getAdcrZbMax()
    {
        return $this->adcrZbMax;
    }

    /**
     * Set adcrZbMaxColor
     *
     * @access public
     * @param string $adcrZbMaxColor
     * @return Measurement
     */
    public function setAdcrZbMaxColor($adcrZbMaxColor = null)
    {
        $this->adcrZbMaxColor = $adcrZbMaxColor;
        return $this;
    }

    /**
     * Get adcrZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAdcrZbMaxColor()
    {
        return $this->adcrZbMaxColor;
    }

    /**
     * Set adcrZcMax
     *
     * @access public
     * @param float $adcrZcMax
     * @return Measurement
     */
    public function setAdcrZcMax($adcrZcMax = null)
    {
        $this->adcrZcMax = $adcrZcMax;
        return $this;
    }

    /**
     * Get adcrZcMax
     *
     * @access public
     * @return float 
     */
    public function getAdcrZcMax()
    {
        return $this->adcrZcMax;
    }

    /**
     * Set adcrZcMaxColor
     *
     * @access public
     * @param string $adcrZcMaxColor
     * @return Measurement
     */
    public function setAdcrZcMaxColor($adcrZcMaxColor = null)
    {
        $this->adcrZcMaxColor = $adcrZcMaxColor;
        return $this;
    }

    /**
     * Get adcrZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAdcrZcMaxColor()
    {
        return $this->adcrZcMaxColor;
    }

    /**
     * Set adcrZdMax
     *
     * @access public
     * @param float $adcrZdMax
     * @return Measurement
     */
    public function setAdcrZdMax($adcrZdMax = null)
    {
        $this->adcrZdMax = $adcrZdMax;
        return $this;
    }

    /**
     * Get adcrZdMax
     *
     * @access public
     * @return float 
     */
    public function getAdcrZdMax()
    {
        return $this->adcrZdMax;
    }

    /**
     * Set adcrZdMaxColor
     *
     * @access public
     * @param string $adcrZdMaxColor
     * @return Measurement
     */
    public function setAdcrZdMaxColor($adcrZdMaxColor = null)
    {
        $this->adcrZdMaxColor = $adcrZdMaxColor;
        return $this;
    }

    /**
     * Get adcrZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAdcrZdMaxColor()
    {
        return $this->adcrZdMaxColor;
    }

    /**
     * Set adcrZeMax
     *
     * @access public
     * @param float $adcrZeMax
     * @return Measurement
     */
    public function setAdcrZeMax($adcrZeMax = null)
    {
        $this->adcrZeMax = $adcrZeMax;
        return $this;
    }

    /**
     * Get adcrZeMax
     *
     * @access public
     * @return float 
     */
    public function getAdcrZeMax()
    {
        return $this->adcrZeMax;
    }

    /**
     * Set adcrZeMaxColor
     *
     * @access public
     * @param string $adcrZeMaxColor
     * @return Measurement
     */
    public function setAdcrZeMaxColor($adcrZeMaxColor = null)
    {
        $this->adcrZeMaxColor = $adcrZeMaxColor;
        return $this;
    }

    /**
     * Get adcrZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAdcrZeMaxColor()
    {
        return $this->adcrZeMaxColor;
    }

    /**
     * Set adcrZone
     *
     * @access public
     * @param float $adcrZone
     * @return Measurement
     */
    public function setAdcrZone($adcrZone = null)
    {
        $this->adcrZone = $adcrZone;
        return $this;
    }

    /**
     * Get adcrZone
     *
     * @access public
     * @return float 
     */
    public function getAdcrZone()
    {
        return $this->adcrZone;
    }

    /**
     * Set fmHcPcRef100
     *
     * @access public
     * @param float $fmHcPcRef100
     * @return Measurement
     */
    public function setFmHcPcRef100($fmHcPcRef100 = null)
    {
        $this->fmHcPcRef100 = $fmHcPcRef100;
        return $this;
    }

    /**
     * Get fmHcPcRef100
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcRef100()
    {
        return $this->fmHcPcRef100;
    }

    /**
     * Set asmmi
     *
     * @access public
     * @param float $asmmi
     * @return Measurement
     */
    public function setAsmmi($asmmi = null)
    {
        $this->asmmi = $asmmi;
        return $this;
    }

    /**
     * Get asmmi
     *
     * @access public
     * @return float 
     */
    public function getAsmmi()
    {
        return $this->asmmi;
    }

    /**
     * Set asmmiStdA
     *
     * @access public
     * @param float $asmmiStdA
     * @return Measurement
     */
    public function setAsmmiStdA($asmmiStdA = null)
    {
        $this->asmmiStdA = $asmmiStdA;
        return $this;
    }

    /**
     * Get asmmiStdA
     *
     * @access public
     * @return float 
     */
    public function getAsmmiStdA()
    {
        return $this->asmmiStdA;
    }

    /**
     * Set asmmiStdB
     *
     * @access public
     * @param float $asmmiStdB
     * @return Measurement
     */
    public function setAsmmiStdB($asmmiStdB = null)
    {
        $this->asmmiStdB = $asmmiStdB;
        return $this;
    }

    /**
     * Get asmmiStdB
     *
     * @access public
     * @return float 
     */
    public function getAsmmiStdB()
    {
        return $this->asmmiStdB;
    }

    /**
     * Set asmmiStdC
     *
     * @access public
     * @param float $asmmiStdC
     * @return Measurement
     */
    public function setAsmmiStdC($asmmiStdC = null)
    {
        $this->asmmiStdC = $asmmiStdC;
        return $this;
    }

    /**
     * Get asmmiStdC
     *
     * @access public
     * @return float 
     */
    public function getAsmmiStdC()
    {
        return $this->asmmiStdC;
    }

    /**
     * Set asmmiStdD
     *
     * @access public
     * @param float $asmmiStdD
     * @return Measurement
     */
    public function setAsmmiStdD($asmmiStdD = null)
    {
        $this->asmmiStdD = $asmmiStdD;
        return $this;
    }

    /**
     * Get asmmiStdD
     *
     * @access public
     * @return float 
     */
    public function getAsmmiStdD()
    {
        return $this->asmmiStdD;
    }

    /**
     * Set asmmiZaMax
     *
     * @access public
     * @param float $asmmiZaMax
     * @return Measurement
     */
    public function setAsmmiZaMax($asmmiZaMax = null)
    {
        $this->asmmiZaMax = $asmmiZaMax;
        return $this;
    }

    /**
     * Get asmmiZaMax
     *
     * @access public
     * @return float 
     */
    public function getAsmmiZaMax()
    {
        return $this->asmmiZaMax;
    }

    /**
     * Set asmmiZaMaxColor
     *
     * @access public
     * @param string $asmmiZaMaxColor
     * @return Measurement
     */
    public function setAsmmiZaMaxColor($asmmiZaMaxColor = null)
    {
        $this->asmmiZaMaxColor = $asmmiZaMaxColor;
        return $this;
    }

    /**
     * Get asmmiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmmiZaMaxColor()
    {
        return $this->asmmiZaMaxColor;
    }

    /**
     * Set asmmiZbMax
     *
     * @access public
     * @param float $asmmiZbMax
     * @return Measurement
     */
    public function setAsmmiZbMax($asmmiZbMax = null)
    {
        $this->asmmiZbMax = $asmmiZbMax;
        return $this;
    }

    /**
     * Get asmmiZbMax
     *
     * @access public
     * @return float 
     */
    public function getAsmmiZbMax()
    {
        return $this->asmmiZbMax;
    }

    /**
     * Set asmmiZbMaxColor
     *
     * @access public
     * @param string $asmmiZbMaxColor
     * @return Measurement
     */
    public function setAsmmiZbMaxColor($asmmiZbMaxColor = null)
    {
        $this->asmmiZbMaxColor = $asmmiZbMaxColor;
        return $this;
    }

    /**
     * Get asmmiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmmiZbMaxColor()
    {
        return $this->asmmiZbMaxColor;
    }

    /**
     * Set asmmiZcMax
     *
     * @access public
     * @param float $asmmiZcMax
     * @return Measurement
     */
    public function setAsmmiZcMax($asmmiZcMax = null)
    {
        $this->asmmiZcMax = $asmmiZcMax;
        return $this;
    }

    /**
     * Get asmmiZcMax
     *
     * @access public
     * @return float 
     */
    public function getAsmmiZcMax()
    {
        return $this->asmmiZcMax;
    }

    /**
     * Set asmmiZcMaxColor
     *
     * @access public
     * @param string $asmmiZcMaxColor
     * @return Measurement
     */
    public function setAsmmiZcMaxColor($asmmiZcMaxColor = null)
    {
        $this->asmmiZcMaxColor = $asmmiZcMaxColor;
        return $this;
    }

    /**
     * Get asmmiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmmiZcMaxColor()
    {
        return $this->asmmiZcMaxColor;
    }

    /**
     * Set asmmiZdMax
     *
     * @access public
     * @param float $asmmiZdMax
     * @return Measurement
     */
    public function setAsmmiZdMax($asmmiZdMax = null)
    {
        $this->asmmiZdMax = $asmmiZdMax;
        return $this;
    }

    /**
     * Get asmmiZdMax
     *
     * @access public
     * @return float 
     */
    public function getAsmmiZdMax()
    {
        return $this->asmmiZdMax;
    }

    /**
     * Set asmmiZdMaxColor
     *
     * @access public
     * @param string $asmmiZdMaxColor
     * @return Measurement
     */
    public function setAsmmiZdMaxColor($asmmiZdMaxColor = null)
    {
        $this->asmmiZdMaxColor = $asmmiZdMaxColor;
        return $this;
    }

    /**
     * Get asmmiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmmiZdMaxColor()
    {
        return $this->asmmiZdMaxColor;
    }

    /**
     * Set asmmiZone
     *
     * @access public
     * @param float $asmmiZone
     * @return Measurement
     */
    public function setAsmmiZone($asmmiZone = null)
    {
        $this->asmmiZone = $asmmiZone;
        return $this;
    }

    /**
     * Get asmmiZone
     *
     * @access public
     * @return float 
     */
    public function getAsmmiZone()
    {
        return $this->asmmiZone;
    }

    /**
     * Set ecwPc100
     *
     * @access public
     * @param float $ecwPc100
     * @return Measurement
     */
    public function setEcwPc100($ecwPc100 = null)
    {
        $this->ecwPc100 = $ecwPc100;
        return $this;
    }

    /**
     * Get ecwPc100
     *
     * @access public
     * @return float 
     */
    public function getEcwPc100()
    {
        return $this->ecwPc100;
    }

    /**
     * Set ecwPcRef100
     *
     * @access public
     * @param float $ecwPcRef100
     * @return Measurement
     */
    public function setEcwPcRef100($ecwPcRef100 = null)
    {
        $this->ecwPcRef100 = $ecwPcRef100;
        return $this;
    }

    /**
     * Get ecwPcRef100
     *
     * @access public
     * @return float 
     */
    public function getEcwPcRef100()
    {
        return $this->ecwPcRef100;
    }

    /**
     * Set ecwPcStdA
     *
     * @access public
     * @param float $ecwPcStdA
     * @return Measurement
     */
    public function setEcwPcStdA($ecwPcStdA = null)
    {
        $this->ecwPcStdA = $ecwPcStdA;
        return $this;
    }

    /**
     * Get ecwPcStdA
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdA()
    {
        return $this->ecwPcStdA;
    }

    /**
     * Set ecwPcStdB
     *
     * @access public
     * @param float $ecwPcStdB
     * @return Measurement
     */
    public function setEcwPcStdB($ecwPcStdB = null)
    {
        $this->ecwPcStdB = $ecwPcStdB;
        return $this;
    }

    /**
     * Get ecwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdB()
    {
        return $this->ecwPcStdB;
    }

    /**
     * Set ecwPcStdC
     *
     * @access public
     * @param float $ecwPcStdC
     * @return Measurement
     */
    public function setEcwPcStdC($ecwPcStdC = null)
    {
        $this->ecwPcStdC = $ecwPcStdC;
        return $this;
    }

    /**
     * Get ecwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdC()
    {
        return $this->ecwPcStdC;
    }

    /**
     * Set ecwPcStdD
     *
     * @access public
     * @param float $ecwPcStdD
     * @return Measurement
     */
    public function setEcwPcStdD($ecwPcStdD = null)
    {
        $this->ecwPcStdD = $ecwPcStdD;
        return $this;
    }

    /**
     * Get ecwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdD()
    {
        return $this->ecwPcStdD;
    }

    /**
     * Set ecwPcStdE
     *
     * @access public
     * @param float $ecwPcStdE
     * @return Measurement
     */
    public function setEcwPcStdE($ecwPcStdE = null)
    {
        $this->ecwPcStdE = $ecwPcStdE;
        return $this;
    }

    /**
     * Get ecwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdE()
    {
        return $this->ecwPcStdE;
    }

    /**
     * Set ecwPcStdF
     *
     * @access public
     * @param float $ecwPcStdF
     * @return Measurement
     */
    public function setEcwPcStdF($ecwPcStdF = null)
    {
        $this->ecwPcStdF = $ecwPcStdF;
        return $this;
    }

    /**
     * Get ecwPcStdF
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdF()
    {
        return $this->ecwPcStdF;
    }

    /**
     * Set ecwPcStdG
     *
     * @access public
     * @param float $ecwPcStdG
     * @return Measurement
     */
    public function setEcwPcStdG($ecwPcStdG = null)
    {
        $this->ecwPcStdG = $ecwPcStdG;
        return $this;
    }

    /**
     * Get ecwPcStdG
     *
     * @access public
     * @return float 
     */
    public function getEcwPcStdG()
    {
        return $this->ecwPcStdG;
    }

    /**
     * Set ecwPcZaMax
     *
     * @access public
     * @param float $ecwPcZaMax
     * @return Measurement
     */
    public function setEcwPcZaMax($ecwPcZaMax = null)
    {
        $this->ecwPcZaMax = $ecwPcZaMax;
        return $this;
    }

    /**
     * Get ecwPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZaMax()
    {
        return $this->ecwPcZaMax;
    }

    /**
     * Set ecwPcZaMaxColor
     *
     * @access public
     * @param string $ecwPcZaMaxColor
     * @return Measurement
     */
    public function setEcwPcZaMaxColor($ecwPcZaMaxColor = null)
    {
        $this->ecwPcZaMaxColor = $ecwPcZaMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZaMaxColor()
    {
        return $this->ecwPcZaMaxColor;
    }

    /**
     * Set ecwPcZbMax
     *
     * @access public
     * @param float $ecwPcZbMax
     * @return Measurement
     */
    public function setEcwPcZbMax($ecwPcZbMax = null)
    {
        $this->ecwPcZbMax = $ecwPcZbMax;
        return $this;
    }

    /**
     * Get ecwPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZbMax()
    {
        return $this->ecwPcZbMax;
    }

    /**
     * Set ecwPcZbMaxColor
     *
     * @access public
     * @param string $ecwPcZbMaxColor
     * @return Measurement
     */
    public function setEcwPcZbMaxColor($ecwPcZbMaxColor = null)
    {
        $this->ecwPcZbMaxColor = $ecwPcZbMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZbMaxColor()
    {
        return $this->ecwPcZbMaxColor;
    }

    /**
     * Set ecwPcZcMax
     *
     * @access public
     * @param float $ecwPcZcMax
     * @return Measurement
     */
    public function setEcwPcZcMax($ecwPcZcMax = null)
    {
        $this->ecwPcZcMax = $ecwPcZcMax;
        return $this;
    }

    /**
     * Get ecwPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZcMax()
    {
        return $this->ecwPcZcMax;
    }

    /**
     * Set ecwPcZcMaxColor
     *
     * @access public
     * @param string $ecwPcZcMaxColor
     * @return Measurement
     */
    public function setEcwPcZcMaxColor($ecwPcZcMaxColor = null)
    {
        $this->ecwPcZcMaxColor = $ecwPcZcMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZcMaxColor()
    {
        return $this->ecwPcZcMaxColor;
    }

    /**
     * Set ecwPcZdMax
     *
     * @access public
     * @param float $ecwPcZdMax
     * @return Measurement
     */
    public function setEcwPcZdMax($ecwPcZdMax = null)
    {
        $this->ecwPcZdMax = $ecwPcZdMax;
        return $this;
    }

    /**
     * Get ecwPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZdMax()
    {
        return $this->ecwPcZdMax;
    }

    /**
     * Set ecwPcZdMaxColor
     *
     * @access public
     * @param string $ecwPcZdMaxColor
     * @return Measurement
     */
    public function setEcwPcZdMaxColor($ecwPcZdMaxColor = null)
    {
        $this->ecwPcZdMaxColor = $ecwPcZdMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZdMaxColor()
    {
        return $this->ecwPcZdMaxColor;
    }

    /**
     * Set ecwPcZeMax
     *
     * @access public
     * @param float $ecwPcZeMax
     * @return Measurement
     */
    public function setEcwPcZeMax($ecwPcZeMax = null)
    {
        $this->ecwPcZeMax = $ecwPcZeMax;
        return $this;
    }

    /**
     * Get ecwPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZeMax()
    {
        return $this->ecwPcZeMax;
    }

    /**
     * Set ecwPcZeMaxColor
     *
     * @access public
     * @param string $ecwPcZeMaxColor
     * @return Measurement
     */
    public function setEcwPcZeMaxColor($ecwPcZeMaxColor = null)
    {
        $this->ecwPcZeMaxColor = $ecwPcZeMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZeMaxColor()
    {
        return $this->ecwPcZeMaxColor;
    }

    /**
     * Set ecwPcZfMax
     *
     * @access public
     * @param float $ecwPcZfMax
     * @return Measurement
     */
    public function setEcwPcZfMax($ecwPcZfMax = null)
    {
        $this->ecwPcZfMax = $ecwPcZfMax;
        return $this;
    }

    /**
     * Get ecwPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZfMax()
    {
        return $this->ecwPcZfMax;
    }

    /**
     * Set ecwPcZfMaxColor
     *
     * @access public
     * @param string $ecwPcZfMaxColor
     * @return Measurement
     */
    public function setEcwPcZfMaxColor($ecwPcZfMaxColor = null)
    {
        $this->ecwPcZfMaxColor = $ecwPcZfMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZfMaxColor()
    {
        return $this->ecwPcZfMaxColor;
    }

    /**
     * Set ecwPcZgMax
     *
     * @access public
     * @param float $ecwPcZgMax
     * @return Measurement
     */
    public function setEcwPcZgMax($ecwPcZgMax = null)
    {
        $this->ecwPcZgMax = $ecwPcZgMax;
        return $this;
    }

    /**
     * Get ecwPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZgMax()
    {
        return $this->ecwPcZgMax;
    }

    /**
     * Set ecwPcZgMaxColor
     *
     * @access public
     * @param string $ecwPcZgMaxColor
     * @return Measurement
     */
    public function setEcwPcZgMaxColor($ecwPcZgMaxColor = null)
    {
        $this->ecwPcZgMaxColor = $ecwPcZgMaxColor;
        return $this;
    }

    /**
     * Get ecwPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getEcwPcZgMaxColor()
    {
        return $this->ecwPcZgMaxColor;
    }

    /**
     * Set ecwPcZone
     *
     * @access public
     * @param float $ecwPcZone
     * @return Measurement
     */
    public function setEcwPcZone($ecwPcZone = null)
    {
        $this->ecwPcZone = $ecwPcZone;
        return $this;
    }

    /**
     * Get ecwPcZone
     *
     * @access public
     * @return float 
     */
    public function getEcwPcZone()
    {
        return $this->ecwPcZone;
    }

    /**
     * Set icwPc100
     *
     * @access public
     * @param float $icwPc100
     * @return Measurement
     */
    public function setIcwPc100($icwPc100 = null)
    {
        $this->icwPc100 = $icwPc100;
        return $this;
    }

    /**
     * Get icwPc100
     *
     * @access public
     * @return float 
     */
    public function getIcwPc100()
    {
        return $this->icwPc100;
    }

    /**
     * Set icwPcRef100
     *
     * @access public
     * @param float $icwPcRef100
     * @return Measurement
     */
    public function setIcwPcRef100($icwPcRef100 = null)
    {
        $this->icwPcRef100 = $icwPcRef100;
        return $this;
    }

    /**
     * Get icwPcRef100
     *
     * @access public
     * @return float 
     */
    public function getIcwPcRef100()
    {
        return $this->icwPcRef100;
    }

    /**
     * Set icwPcStdA
     *
     * @access public
     * @param float $icwPcStdA
     * @return Measurement
     */
    public function setIcwPcStdA($icwPcStdA = null)
    {
        $this->icwPcStdA = $icwPcStdA;
        return $this;
    }

    /**
     * Get icwPcStdA
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdA()
    {
        return $this->icwPcStdA;
    }

    /**
     * Set icwPcStdB
     *
     * @access public
     * @param float $icwPcStdB
     * @return Measurement
     */
    public function setIcwPcStdB($icwPcStdB = null)
    {
        $this->icwPcStdB = $icwPcStdB;
        return $this;
    }

    /**
     * Get icwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdB()
    {
        return $this->icwPcStdB;
    }

    /**
     * Set icwPcStdC
     *
     * @access public
     * @param float $icwPcStdC
     * @return Measurement
     */
    public function setIcwPcStdC($icwPcStdC = null)
    {
        $this->icwPcStdC = $icwPcStdC;
        return $this;
    }

    /**
     * Get icwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdC()
    {
        return $this->icwPcStdC;
    }

    /**
     * Set icwPcStdD
     *
     * @access public
     * @param float $icwPcStdD
     * @return Measurement
     */
    public function setIcwPcStdD($icwPcStdD = null)
    {
        $this->icwPcStdD = $icwPcStdD;
        return $this;
    }

    /**
     * Get icwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdD()
    {
        return $this->icwPcStdD;
    }

    /**
     * Set icwPcStdE
     *
     * @access public
     * @param float $icwPcStdE
     * @return Measurement
     */
    public function setIcwPcStdE($icwPcStdE = null)
    {
        $this->icwPcStdE = $icwPcStdE;
        return $this;
    }

    /**
     * Get icwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdE()
    {
        return $this->icwPcStdE;
    }

    /**
     * Set icwPcStdF
     *
     * @access public
     * @param float $icwPcStdF
     * @return Measurement
     */
    public function setIcwPcStdF($icwPcStdF = null)
    {
        $this->icwPcStdF = $icwPcStdF;
        return $this;
    }

    /**
     * Get icwPcStdF
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdF()
    {
        return $this->icwPcStdF;
    }

    /**
     * Set icwPcStdG
     *
     * @access public
     * @param float $icwPcStdG
     * @return Measurement
     */
    public function setIcwPcStdG($icwPcStdG = null)
    {
        $this->icwPcStdG = $icwPcStdG;
        return $this;
    }

    /**
     * Get icwPcStdG
     *
     * @access public
     * @return float 
     */
    public function getIcwPcStdG()
    {
        return $this->icwPcStdG;
    }

    /**
     * Set icwPcZaMax
     *
     * @access public
     * @param float $icwPcZaMax
     * @return Measurement
     */
    public function setIcwPcZaMax($icwPcZaMax = null)
    {
        $this->icwPcZaMax = $icwPcZaMax;
        return $this;
    }

    /**
     * Get icwPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZaMax()
    {
        return $this->icwPcZaMax;
    }

    /**
     * Set icwPcZaMaxColor
     *
     * @access public
     * @param string $icwPcZaMaxColor
     * @return Measurement
     */
    public function setIcwPcZaMaxColor($icwPcZaMaxColor = null)
    {
        $this->icwPcZaMaxColor = $icwPcZaMaxColor;
        return $this;
    }

    /**
     * Get icwPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZaMaxColor()
    {
        return $this->icwPcZaMaxColor;
    }

    /**
     * Set icwPcZbMax
     *
     * @access public
     * @param float $icwPcZbMax
     * @return Measurement
     */
    public function setIcwPcZbMax($icwPcZbMax = null)
    {
        $this->icwPcZbMax = $icwPcZbMax;
        return $this;
    }

    /**
     * Get icwPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZbMax()
    {
        return $this->icwPcZbMax;
    }

    /**
     * Set icwPcZbMaxColor
     *
     * @access public
     * @param string $icwPcZbMaxColor
     * @return Measurement
     */
    public function setIcwPcZbMaxColor($icwPcZbMaxColor = null)
    {
        $this->icwPcZbMaxColor = $icwPcZbMaxColor;
        return $this;
    }

    /**
     * Get icwPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZbMaxColor()
    {
        return $this->icwPcZbMaxColor;
    }

    /**
     * Set icwPcZcMax
     *
     * @access public
     * @param float $icwPcZcMax
     * @return Measurement
     */
    public function setIcwPcZcMax($icwPcZcMax = null)
    {
        $this->icwPcZcMax = $icwPcZcMax;
        return $this;
    }

    /**
     * Get icwPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZcMax()
    {
        return $this->icwPcZcMax;
    }

    /**
     * Set icwPcZcMaxColor
     *
     * @access public
     * @param string $icwPcZcMaxColor
     * @return Measurement
     */
    public function setIcwPcZcMaxColor($icwPcZcMaxColor = null)
    {
        $this->icwPcZcMaxColor = $icwPcZcMaxColor;
        return $this;
    }

    /**
     * Get icwPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZcMaxColor()
    {
        return $this->icwPcZcMaxColor;
    }

    /**
     * Set icwPcZdMax
     *
     * @access public
     * @param float $icwPcZdMax
     * @return Measurement
     */
    public function setIcwPcZdMax($icwPcZdMax = null)
    {
        $this->icwPcZdMax = $icwPcZdMax;
        return $this;
    }

    /**
     * Get icwPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZdMax()
    {
        return $this->icwPcZdMax;
    }

    /**
     * Set icwPcZdMaxColor
     *
     * @access public
     * @param string $icwPcZdMaxColor
     * @return Measurement
     */
    public function setIcwPcZdMaxColor($icwPcZdMaxColor = null)
    {
        $this->icwPcZdMaxColor = $icwPcZdMaxColor;
        return $this;
    }

    /**
     * Get icwPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZdMaxColor()
    {
        return $this->icwPcZdMaxColor;
    }

    /**
     * Set icwPcZeMax
     *
     * @access public
     * @param float $icwPcZeMax
     * @return Measurement
     */
    public function setIcwPcZeMax($icwPcZeMax = null)
    {
        $this->icwPcZeMax = $icwPcZeMax;
        return $this;
    }

    /**
     * Get icwPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZeMax()
    {
        return $this->icwPcZeMax;
    }

    /**
     * Set icwPcZeMaxColor
     *
     * @access public
     * @param string $icwPcZeMaxColor
     * @return Measurement
     */
    public function setIcwPcZeMaxColor($icwPcZeMaxColor = null)
    {
        $this->icwPcZeMaxColor = $icwPcZeMaxColor;
        return $this;
    }

    /**
     * Get icwPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZeMaxColor()
    {
        return $this->icwPcZeMaxColor;
    }

    /**
     * Set icwPcZfMax
     *
     * @access public
     * @param float $icwPcZfMax
     * @return Measurement
     */
    public function setIcwPcZfMax($icwPcZfMax = null)
    {
        $this->icwPcZfMax = $icwPcZfMax;
        return $this;
    }

    /**
     * Get icwPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZfMax()
    {
        return $this->icwPcZfMax;
    }

    /**
     * Set icwPcZfMaxColor
     *
     * @access public
     * @param string $icwPcZfMaxColor
     * @return Measurement
     */
    public function setIcwPcZfMaxColor($icwPcZfMaxColor = null)
    {
        $this->icwPcZfMaxColor = $icwPcZfMaxColor;
        return $this;
    }

    /**
     * Get icwPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZfMaxColor()
    {
        return $this->icwPcZfMaxColor;
    }

    /**
     * Set icwPcZgMax
     *
     * @access public
     * @param float $icwPcZgMax
     * @return Measurement
     */
    public function setIcwPcZgMax($icwPcZgMax = null)
    {
        $this->icwPcZgMax = $icwPcZgMax;
        return $this;
    }

    /**
     * Get icwPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZgMax()
    {
        return $this->icwPcZgMax;
    }

    /**
     * Set icwPcZgMaxColor
     *
     * @access public
     * @param string $icwPcZgMaxColor
     * @return Measurement
     */
    public function setIcwPcZgMaxColor($icwPcZgMaxColor = null)
    {
        $this->icwPcZgMaxColor = $icwPcZgMaxColor;
        return $this;
    }

    /**
     * Get icwPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIcwPcZgMaxColor()
    {
        return $this->icwPcZgMaxColor;
    }

    /**
     * Set icwPcZone
     *
     * @access public
     * @param float $icwPcZone
     * @return Measurement
     */
    public function setIcwPcZone($icwPcZone = null)
    {
        $this->icwPcZone = $icwPcZone;
        return $this;
    }

    /**
     * Get icwPcZone
     *
     * @access public
     * @return float 
     */
    public function getIcwPcZone()
    {
        return $this->icwPcZone;
    }

    /**
     * Set fmPc100
     *
     * @access public
     * @param float $fmPc100
     * @return Measurement
     */
    public function setFmPc100($fmPc100 = null)
    {
        $this->fmPc100 = $fmPc100;
        return $this;
    }

    /**
     * Get fmPc100
     *
     * @access public
     * @return float 
     */
    public function getFmPc100()
    {
        return $this->fmPc100;
    }

    /**
     * Set fmPcStdA
     *
     * @access public
     * @param float $fmPcStdA
     * @return Measurement
     */
    public function setFmPcStdA($fmPcStdA = null)
    {
        $this->fmPcStdA = $fmPcStdA;
        return $this;
    }

    /**
     * Get fmPcStdA
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdA()
    {
        return $this->fmPcStdA;
    }

    /**
     * Set fmPcStdB
     *
     * @access public
     * @param float $fmPcStdB
     * @return Measurement
     */
    public function setFmPcStdB($fmPcStdB = null)
    {
        $this->fmPcStdB = $fmPcStdB;
        return $this;
    }

    /**
     * Get fmPcStdB
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdB()
    {
        return $this->fmPcStdB;
    }

    /**
     * Set fmPcStdC
     *
     * @access public
     * @param float $fmPcStdC
     * @return Measurement
     */
    public function setFmPcStdC($fmPcStdC = null)
    {
        $this->fmPcStdC = $fmPcStdC;
        return $this;
    }

    /**
     * Get fmPcStdC
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdC()
    {
        return $this->fmPcStdC;
    }

    /**
     * Set fmPcStdD
     *
     * @access public
     * @param float $fmPcStdD
     * @return Measurement
     */
    public function setFmPcStdD($fmPcStdD = null)
    {
        $this->fmPcStdD = $fmPcStdD;
        return $this;
    }

    /**
     * Get fmPcStdD
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdD()
    {
        return $this->fmPcStdD;
    }

    /**
     * Set fmPcStdE
     *
     * @access public
     * @param float $fmPcStdE
     * @return Measurement
     */
    public function setFmPcStdE($fmPcStdE = null)
    {
        $this->fmPcStdE = $fmPcStdE;
        return $this;
    }

    /**
     * Get fmPcStdE
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdE()
    {
        return $this->fmPcStdE;
    }

    /**
     * Set fmPcStdF
     *
     * @access public
     * @param float $fmPcStdF
     * @return Measurement
     */
    public function setFmPcStdF($fmPcStdF = null)
    {
        $this->fmPcStdF = $fmPcStdF;
        return $this;
    }

    /**
     * Get fmPcStdF
     *
     * @access public
     * @return float 
     */
    public function getFmPcStdF()
    {
        return $this->fmPcStdF;
    }

    /**
     * Set fmPcZaMax
     *
     * @access public
     * @param float $fmPcZaMax
     * @return Measurement
     */
    public function setFmPcZaMax($fmPcZaMax = null)
    {
        $this->fmPcZaMax = $fmPcZaMax;
        return $this;
    }

    /**
     * Get fmPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZaMax()
    {
        return $this->fmPcZaMax;
    }

    /**
     * Set fmPcZaMaxColor
     *
     * @access public
     * @param string $fmPcZaMaxColor
     * @return Measurement
     */
    public function setFmPcZaMaxColor($fmPcZaMaxColor = null)
    {
        $this->fmPcZaMaxColor = $fmPcZaMaxColor;
        return $this;
    }

    /**
     * Get fmPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZaMaxColor()
    {
        return $this->fmPcZaMaxColor;
    }

    /**
     * Set fmPcZbMax
     *
     * @access public
     * @param float $fmPcZbMax
     * @return Measurement
     */
    public function setFmPcZbMax($fmPcZbMax = null)
    {
        $this->fmPcZbMax = $fmPcZbMax;
        return $this;
    }

    /**
     * Get fmPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZbMax()
    {
        return $this->fmPcZbMax;
    }

    /**
     * Set fmPcZbMaxColor
     *
     * @access public
     * @param string $fmPcZbMaxColor
     * @return Measurement
     */
    public function setFmPcZbMaxColor($fmPcZbMaxColor = null)
    {
        $this->fmPcZbMaxColor = $fmPcZbMaxColor;
        return $this;
    }

    /**
     * Get fmPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZbMaxColor()
    {
        return $this->fmPcZbMaxColor;
    }

    /**
     * Set fmPcZcMax
     *
     * @access public
     * @param float $fmPcZcMax
     * @return Measurement
     */
    public function setFmPcZcMax($fmPcZcMax = null)
    {
        $this->fmPcZcMax = $fmPcZcMax;
        return $this;
    }

    /**
     * Get fmPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZcMax()
    {
        return $this->fmPcZcMax;
    }

    /**
     * Set fmPcZcMaxColor
     *
     * @access public
     * @param string $fmPcZcMaxColor
     * @return Measurement
     */
    public function setFmPcZcMaxColor($fmPcZcMaxColor = null)
    {
        $this->fmPcZcMaxColor = $fmPcZcMaxColor;
        return $this;
    }

    /**
     * Get fmPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZcMaxColor()
    {
        return $this->fmPcZcMaxColor;
    }

    /**
     * Set fmPcZdMax
     *
     * @access public
     * @param float $fmPcZdMax
     * @return Measurement
     */
    public function setFmPcZdMax($fmPcZdMax = null)
    {
        $this->fmPcZdMax = $fmPcZdMax;
        return $this;
    }

    /**
     * Get fmPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZdMax()
    {
        return $this->fmPcZdMax;
    }

    /**
     * Set fmPcZdMaxColor
     *
     * @access public
     * @param string $fmPcZdMaxColor
     * @return Measurement
     */
    public function setFmPcZdMaxColor($fmPcZdMaxColor = null)
    {
        $this->fmPcZdMaxColor = $fmPcZdMaxColor;
        return $this;
    }

    /**
     * Get fmPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZdMaxColor()
    {
        return $this->fmPcZdMaxColor;
    }

    /**
     * Set fmPcZeMax
     *
     * @access public
     * @param float $fmPcZeMax
     * @return Measurement
     */
    public function setFmPcZeMax($fmPcZeMax = null)
    {
        $this->fmPcZeMax = $fmPcZeMax;
        return $this;
    }

    /**
     * Get fmPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZeMax()
    {
        return $this->fmPcZeMax;
    }

    /**
     * Set fmPcZeMaxColor
     *
     * @access public
     * @param string $fmPcZeMaxColor
     * @return Measurement
     */
    public function setFmPcZeMaxColor($fmPcZeMaxColor = null)
    {
        $this->fmPcZeMaxColor = $fmPcZeMaxColor;
        return $this;
    }

    /**
     * Get fmPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZeMaxColor()
    {
        return $this->fmPcZeMaxColor;
    }

    /**
     * Set fmPcZfMax
     *
     * @access public
     * @param float $fmPcZfMax
     * @return Measurement
     */
    public function setFmPcZfMax($fmPcZfMax = null)
    {
        $this->fmPcZfMax = $fmPcZfMax;
        return $this;
    }

    /**
     * Get fmPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getFmPcZfMax()
    {
        return $this->fmPcZfMax;
    }

    /**
     * Set fmPcZfMaxColor
     *
     * @access public
     * @param string $fmPcZfMaxColor
     * @return Measurement
     */
    public function setFmPcZfMaxColor($fmPcZfMaxColor = null)
    {
        $this->fmPcZfMaxColor = $fmPcZfMaxColor;
        return $this;
    }

    /**
     * Get fmPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmPcZfMaxColor()
    {
        return $this->fmPcZfMaxColor;
    }

    /**
     * Set fmPcZone
     *
     * @access public
     * @param float $fmPcZone
     * @return Measurement
     */
    public function setFmPcZone($fmPcZone = null)
    {
        $this->fmPcZone = $fmPcZone;
        return $this;
    }

    /**
     * Get fmPcZone
     *
     * @access public
     * @return float 
     */
    public function getFmPcZone()
    {
        return $this->fmPcZone;
    }

    /**
     * Set tbwffmPc100
     *
     * @access public
     * @param float $tbwffmPc100
     * @return Measurement
     */
    public function setTbwffmPc100($tbwffmPc100 = null)
    {
        $this->tbwffmPc100 = $tbwffmPc100;
        return $this;
    }

    /**
     * Get tbwffmPc100
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPc100()
    {
        return $this->tbwffmPc100;
    }

    /**
     * Set tbwffmPcStdA
     *
     * @access public
     * @param float $tbwffmPcStdA
     * @return Measurement
     */
    public function setTbwffmPcStdA($tbwffmPcStdA = null)
    {
        $this->tbwffmPcStdA = $tbwffmPcStdA;
        return $this;
    }

    /**
     * Get tbwffmPcStdA
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdA()
    {
        return $this->tbwffmPcStdA;
    }

    /**
     * Set tbwffmPcStdB
     *
     * @access public
     * @param float $tbwffmPcStdB
     * @return Measurement
     */
    public function setTbwffmPcStdB($tbwffmPcStdB = null)
    {
        $this->tbwffmPcStdB = $tbwffmPcStdB;
        return $this;
    }

    /**
     * Get tbwffmPcStdB
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdB()
    {
        return $this->tbwffmPcStdB;
    }

    /**
     * Set tbwffmPcStdC
     *
     * @access public
     * @param float $tbwffmPcStdC
     * @return Measurement
     */
    public function setTbwffmPcStdC($tbwffmPcStdC = null)
    {
        $this->tbwffmPcStdC = $tbwffmPcStdC;
        return $this;
    }

    /**
     * Get tbwffmPcStdC
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdC()
    {
        return $this->tbwffmPcStdC;
    }

    /**
     * Set tbwffmPcStdD
     *
     * @access public
     * @param float $tbwffmPcStdD
     * @return Measurement
     */
    public function setTbwffmPcStdD($tbwffmPcStdD = null)
    {
        $this->tbwffmPcStdD = $tbwffmPcStdD;
        return $this;
    }

    /**
     * Get tbwffmPcStdD
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdD()
    {
        return $this->tbwffmPcStdD;
    }

    /**
     * Set tbwffmPcStdE
     *
     * @access public
     * @param float $tbwffmPcStdE
     * @return Measurement
     */
    public function setTbwffmPcStdE($tbwffmPcStdE = null)
    {
        $this->tbwffmPcStdE = $tbwffmPcStdE;
        return $this;
    }

    /**
     * Get tbwffmPcStdE
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdE()
    {
        return $this->tbwffmPcStdE;
    }

    /**
     * Set tbwffmPcStdF
     *
     * @access public
     * @param float $tbwffmPcStdF
     * @return Measurement
     */
    public function setTbwffmPcStdF($tbwffmPcStdF = null)
    {
        $this->tbwffmPcStdF = $tbwffmPcStdF;
        return $this;
    }

    /**
     * Get tbwffmPcStdF
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdF()
    {
        return $this->tbwffmPcStdF;
    }

    /**
     * Set tbwffmPcStdG
     *
     * @access public
     * @param float $tbwffmPcStdG
     * @return Measurement
     */
    public function setTbwffmPcStdG($tbwffmPcStdG = null)
    {
        $this->tbwffmPcStdG = $tbwffmPcStdG;
        return $this;
    }

    /**
     * Get tbwffmPcStdG
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcStdG()
    {
        return $this->tbwffmPcStdG;
    }

    /**
     * Set tbwffmPcZaMax
     *
     * @access public
     * @param float $tbwffmPcZaMax
     * @return Measurement
     */
    public function setTbwffmPcZaMax($tbwffmPcZaMax = null)
    {
        $this->tbwffmPcZaMax = $tbwffmPcZaMax;
        return $this;
    }

    /**
     * Get tbwffmPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZaMax()
    {
        return $this->tbwffmPcZaMax;
    }

    /**
     * Set tbwffmPcZaMaxColor
     *
     * @access public
     * @param string $tbwffmPcZaMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZaMaxColor($tbwffmPcZaMaxColor = null)
    {
        $this->tbwffmPcZaMaxColor = $tbwffmPcZaMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZaMaxColor()
    {
        return $this->tbwffmPcZaMaxColor;
    }

    /**
     * Set tbwffmPcZbMax
     *
     * @access public
     * @param float $tbwffmPcZbMax
     * @return Measurement
     */
    public function setTbwffmPcZbMax($tbwffmPcZbMax = null)
    {
        $this->tbwffmPcZbMax = $tbwffmPcZbMax;
        return $this;
    }

    /**
     * Get tbwffmPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZbMax()
    {
        return $this->tbwffmPcZbMax;
    }

    /**
     * Set tbwffmPcZbMaxColor
     *
     * @access public
     * @param string $tbwffmPcZbMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZbMaxColor($tbwffmPcZbMaxColor = null)
    {
        $this->tbwffmPcZbMaxColor = $tbwffmPcZbMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZbMaxColor()
    {
        return $this->tbwffmPcZbMaxColor;
    }

    /**
     * Set tbwffmPcZcMax
     *
     * @access public
     * @param float $tbwffmPcZcMax
     * @return Measurement
     */
    public function setTbwffmPcZcMax($tbwffmPcZcMax = null)
    {
        $this->tbwffmPcZcMax = $tbwffmPcZcMax;
        return $this;
    }

    /**
     * Get tbwffmPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZcMax()
    {
        return $this->tbwffmPcZcMax;
    }

    /**
     * Set tbwffmPcZcMaxColor
     *
     * @access public
     * @param string $tbwffmPcZcMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZcMaxColor($tbwffmPcZcMaxColor = null)
    {
        $this->tbwffmPcZcMaxColor = $tbwffmPcZcMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZcMaxColor()
    {
        return $this->tbwffmPcZcMaxColor;
    }

    /**
     * Set tbwffmPcZdMax
     *
     * @access public
     * @param float $tbwffmPcZdMax
     * @return Measurement
     */
    public function setTbwffmPcZdMax($tbwffmPcZdMax = null)
    {
        $this->tbwffmPcZdMax = $tbwffmPcZdMax;
        return $this;
    }

    /**
     * Get tbwffmPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZdMax()
    {
        return $this->tbwffmPcZdMax;
    }

    /**
     * Set tbwffmPcZdMaxColor
     *
     * @access public
     * @param string $tbwffmPcZdMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZdMaxColor($tbwffmPcZdMaxColor = null)
    {
        $this->tbwffmPcZdMaxColor = $tbwffmPcZdMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZdMaxColor()
    {
        return $this->tbwffmPcZdMaxColor;
    }

    /**
     * Set tbwffmPcZeMax
     *
     * @access public
     * @param float $tbwffmPcZeMax
     * @return Measurement
     */
    public function setTbwffmPcZeMax($tbwffmPcZeMax = null)
    {
        $this->tbwffmPcZeMax = $tbwffmPcZeMax;
        return $this;
    }

    /**
     * Get tbwffmPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZeMax()
    {
        return $this->tbwffmPcZeMax;
    }

    /**
     * Set tbwffmPcZeMaxColor
     *
     * @access public
     * @param string $tbwffmPcZeMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZeMaxColor($tbwffmPcZeMaxColor = null)
    {
        $this->tbwffmPcZeMaxColor = $tbwffmPcZeMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZeMaxColor()
    {
        return $this->tbwffmPcZeMaxColor;
    }

    /**
     * Set tbwffmPcZfMax
     *
     * @access public
     * @param float $tbwffmPcZfMax
     * @return Measurement
     */
    public function setTbwffmPcZfMax($tbwffmPcZfMax = null)
    {
        $this->tbwffmPcZfMax = $tbwffmPcZfMax;
        return $this;
    }

    /**
     * Get tbwffmPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZfMax()
    {
        return $this->tbwffmPcZfMax;
    }

    /**
     * Set tbwffmPcZfMaxColor
     *
     * @access public
     * @param string $tbwffmPcZfMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZfMaxColor($tbwffmPcZfMaxColor = null)
    {
        $this->tbwffmPcZfMaxColor = $tbwffmPcZfMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZfMaxColor()
    {
        return $this->tbwffmPcZfMaxColor;
    }

    /**
     * Set tbwffmPcZgMax
     *
     * @access public
     * @param float $tbwffmPcZgMax
     * @return Measurement
     */
    public function setTbwffmPcZgMax($tbwffmPcZgMax = null)
    {
        $this->tbwffmPcZgMax = $tbwffmPcZgMax;
        return $this;
    }

    /**
     * Get tbwffmPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZgMax()
    {
        return $this->tbwffmPcZgMax;
    }

    /**
     * Set tbwffmPcZgMaxColor
     *
     * @access public
     * @param string $tbwffmPcZgMaxColor
     * @return Measurement
     */
    public function setTbwffmPcZgMaxColor($tbwffmPcZgMaxColor = null)
    {
        $this->tbwffmPcZgMaxColor = $tbwffmPcZgMaxColor;
        return $this;
    }

    /**
     * Get tbwffmPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTbwffmPcZgMaxColor()
    {
        return $this->tbwffmPcZgMaxColor;
    }

    /**
     * Set tbwffmPcZone
     *
     * @access public
     * @param float $tbwffmPcZone
     * @return Measurement
     */
    public function setTbwffmPcZone($tbwffmPcZone = null)
    {
        $this->tbwffmPcZone = $tbwffmPcZone;
        return $this;
    }

    /**
     * Get tbwffmPcZone
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcZone()
    {
        return $this->tbwffmPcZone;
    }

    /**
     * Set dffmi
     *
     * @access public
     * @param float $dffmi
     * @return Measurement
     */
    public function setDffmi($dffmi = null)
    {
        $this->dffmi = $dffmi;
        return $this;
    }

    /**
     * Get dffmi
     *
     * @access public
     * @return float 
     */
    public function getDffmi()
    {
        return $this->dffmi;
    }

    /**
     * Set dffmiStdA
     *
     * @access public
     * @param float $dffmiStdA
     * @return Measurement
     */
    public function setDffmiStdA($dffmiStdA = null)
    {
        $this->dffmiStdA = $dffmiStdA;
        return $this;
    }

    /**
     * Get dffmiStdA
     *
     * @access public
     * @return float 
     */
    public function getDffmiStdA()
    {
        return $this->dffmiStdA;
    }

    /**
     * Set dffmiStdB
     *
     * @access public
     * @param float $dffmiStdB
     * @return Measurement
     */
    public function setDffmiStdB($dffmiStdB = null)
    {
        $this->dffmiStdB = $dffmiStdB;
        return $this;
    }

    /**
     * Get dffmiStdB
     *
     * @access public
     * @return float 
     */
    public function getDffmiStdB()
    {
        return $this->dffmiStdB;
    }

    /**
     * Set dffmiStdC
     *
     * @access public
     * @param float $dffmiStdC
     * @return Measurement
     */
    public function setDffmiStdC($dffmiStdC = null)
    {
        $this->dffmiStdC = $dffmiStdC;
        return $this;
    }

    /**
     * Get dffmiStdC
     *
     * @access public
     * @return float 
     */
    public function getDffmiStdC()
    {
        return $this->dffmiStdC;
    }

    /**
     * Set dffmiStdD
     *
     * @access public
     * @param float $dffmiStdD
     * @return Measurement
     */
    public function setDffmiStdD($dffmiStdD = null)
    {
        $this->dffmiStdD = $dffmiStdD;
        return $this;
    }

    /**
     * Get dffmiStdD
     *
     * @access public
     * @return float 
     */
    public function getDffmiStdD()
    {
        return $this->dffmiStdD;
    }

    /**
     * Set dffmiZaMax
     *
     * @access public
     * @param float $dffmiZaMax
     * @return Measurement
     */
    public function setDffmiZaMax($dffmiZaMax = null)
    {
        $this->dffmiZaMax = $dffmiZaMax;
        return $this;
    }

    /**
     * Get dffmiZaMax
     *
     * @access public
     * @return float 
     */
    public function getDffmiZaMax()
    {
        return $this->dffmiZaMax;
    }

    /**
     * Set dffmiZaMaxColor
     *
     * @access public
     * @param string $dffmiZaMaxColor
     * @return Measurement
     */
    public function setDffmiZaMaxColor($dffmiZaMaxColor = null)
    {
        $this->dffmiZaMaxColor = $dffmiZaMaxColor;
        return $this;
    }

    /**
     * Get dffmiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getDffmiZaMaxColor()
    {
        return $this->dffmiZaMaxColor;
    }

    /**
     * Set dffmiZbMax
     *
     * @access public
     * @param float $dffmiZbMax
     * @return Measurement
     */
    public function setDffmiZbMax($dffmiZbMax = null)
    {
        $this->dffmiZbMax = $dffmiZbMax;
        return $this;
    }

    /**
     * Get dffmiZbMax
     *
     * @access public
     * @return float 
     */
    public function getDffmiZbMax()
    {
        return $this->dffmiZbMax;
    }

    /**
     * Set dffmiZbMaxColor
     *
     * @access public
     * @param string $dffmiZbMaxColor
     * @return Measurement
     */
    public function setDffmiZbMaxColor($dffmiZbMaxColor = null)
    {
        $this->dffmiZbMaxColor = $dffmiZbMaxColor;
        return $this;
    }

    /**
     * Get dffmiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getDffmiZbMaxColor()
    {
        return $this->dffmiZbMaxColor;
    }

    /**
     * Set dffmiZcMax
     *
     * @access public
     * @param float $dffmiZcMax
     * @return Measurement
     */
    public function setDffmiZcMax($dffmiZcMax = null)
    {
        $this->dffmiZcMax = $dffmiZcMax;
        return $this;
    }

    /**
     * Get dffmiZcMax
     *
     * @access public
     * @return float 
     */
    public function getDffmiZcMax()
    {
        return $this->dffmiZcMax;
    }

    /**
     * Set dffmiZcMaxColor
     *
     * @access public
     * @param string $dffmiZcMaxColor
     * @return Measurement
     */
    public function setDffmiZcMaxColor($dffmiZcMaxColor = null)
    {
        $this->dffmiZcMaxColor = $dffmiZcMaxColor;
        return $this;
    }

    /**
     * Get dffmiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getDffmiZcMaxColor()
    {
        return $this->dffmiZcMaxColor;
    }

    /**
     * Set dffmiZdMax
     *
     * @access public
     * @param float $dffmiZdMax
     * @return Measurement
     */
    public function setDffmiZdMax($dffmiZdMax = null)
    {
        $this->dffmiZdMax = $dffmiZdMax;
        return $this;
    }

    /**
     * Get dffmiZdMax
     *
     * @access public
     * @return float 
     */
    public function getDffmiZdMax()
    {
        return $this->dffmiZdMax;
    }

    /**
     * Set dffmiZdMaxColor
     *
     * @access public
     * @param string $dffmiZdMaxColor
     * @return Measurement
     */
    public function setDffmiZdMaxColor($dffmiZdMaxColor = null)
    {
        $this->dffmiZdMaxColor = $dffmiZdMaxColor;
        return $this;
    }

    /**
     * Get dffmiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getDffmiZdMaxColor()
    {
        return $this->dffmiZdMaxColor;
    }

    /**
     * Set dffmiZone
     *
     * @access public
     * @param float $dffmiZone
     * @return Measurement
     */
    public function setDffmiZone($dffmiZone = null)
    {
        $this->dffmiZone = $dffmiZone;
        return $this;
    }

    /**
     * Get dffmiZone
     *
     * @access public
     * @return float 
     */
    public function getDffmiZone()
    {
        return $this->dffmiZone;
    }

    /**
     * Set mpMetai
     *
     * @access public
     * @param float $mpMetai
     * @return Measurement
     */
    public function setMpMetai($mpMetai = null)
    {
        $this->mpMetai = $mpMetai;
        return $this;
    }

    /**
     * Get mpMetai
     *
     * @access public
     * @return float 
     */
    public function getMpMetai()
    {
        return $this->mpMetai;
    }

    /**
     * Set mpMetaiStdA
     *
     * @access public
     * @param float $mpMetaiStdA
     * @return Measurement
     */
    public function setMpMetaiStdA($mpMetaiStdA = null)
    {
        $this->mpMetaiStdA = $mpMetaiStdA;
        return $this;
    }

    /**
     * Get mpMetaiStdA
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiStdA()
    {
        return $this->mpMetaiStdA;
    }

    /**
     * Set mpMetaiStdB
     *
     * @access public
     * @param float $mpMetaiStdB
     * @return Measurement
     */
    public function setMpMetaiStdB($mpMetaiStdB = null)
    {
        $this->mpMetaiStdB = $mpMetaiStdB;
        return $this;
    }

    /**
     * Get mpMetaiStdB
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiStdB()
    {
        return $this->mpMetaiStdB;
    }

    /**
     * Set mpMetaiStdC
     *
     * @access public
     * @param float $mpMetaiStdC
     * @return Measurement
     */
    public function setMpMetaiStdC($mpMetaiStdC = null)
    {
        $this->mpMetaiStdC = $mpMetaiStdC;
        return $this;
    }

    /**
     * Get mpMetaiStdC
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiStdC()
    {
        return $this->mpMetaiStdC;
    }

    /**
     * Set mpMetaiStdD
     *
     * @access public
     * @param float $mpMetaiStdD
     * @return Measurement
     */
    public function setMpMetaiStdD($mpMetaiStdD = null)
    {
        $this->mpMetaiStdD = $mpMetaiStdD;
        return $this;
    }

    /**
     * Get mpMetaiStdD
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiStdD()
    {
        return $this->mpMetaiStdD;
    }

    /**
     * Set mpMetaiZaMax
     *
     * @access public
     * @param float $mpMetaiZaMax
     * @return Measurement
     */
    public function setMpMetaiZaMax($mpMetaiZaMax = null)
    {
        $this->mpMetaiZaMax = $mpMetaiZaMax;
        return $this;
    }

    /**
     * Get mpMetaiZaMax
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiZaMax()
    {
        return $this->mpMetaiZaMax;
    }

    /**
     * Set mpMetaiZaMaxColor
     *
     * @access public
     * @param string $mpMetaiZaMaxColor
     * @return Measurement
     */
    public function setMpMetaiZaMaxColor($mpMetaiZaMaxColor = null)
    {
        $this->mpMetaiZaMaxColor = $mpMetaiZaMaxColor;
        return $this;
    }

    /**
     * Get mpMetaiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMpMetaiZaMaxColor()
    {
        return $this->mpMetaiZaMaxColor;
    }

    /**
     * Set mpMetaiZbMax
     *
     * @access public
     * @param float $mpMetaiZbMax
     * @return Measurement
     */
    public function setMpMetaiZbMax($mpMetaiZbMax = null)
    {
        $this->mpMetaiZbMax = $mpMetaiZbMax;
        return $this;
    }

    /**
     * Get mpMetaiZbMax
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiZbMax()
    {
        return $this->mpMetaiZbMax;
    }

    /**
     * Set mpMetaiZbMaxColor
     *
     * @access public
     * @param string $mpMetaiZbMaxColor
     * @return Measurement
     */
    public function setMpMetaiZbMaxColor($mpMetaiZbMaxColor = null)
    {
        $this->mpMetaiZbMaxColor = $mpMetaiZbMaxColor;
        return $this;
    }

    /**
     * Get mpMetaiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMpMetaiZbMaxColor()
    {
        return $this->mpMetaiZbMaxColor;
    }

    /**
     * Set mpMetaiZcMax
     *
     * @access public
     * @param float $mpMetaiZcMax
     * @return Measurement
     */
    public function setMpMetaiZcMax($mpMetaiZcMax = null)
    {
        $this->mpMetaiZcMax = $mpMetaiZcMax;
        return $this;
    }

    /**
     * Get mpMetaiZcMax
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiZcMax()
    {
        return $this->mpMetaiZcMax;
    }

    /**
     * Set mpMetaiZcMaxColor
     *
     * @access public
     * @param string $mpMetaiZcMaxColor
     * @return Measurement
     */
    public function setMpMetaiZcMaxColor($mpMetaiZcMaxColor = null)
    {
        $this->mpMetaiZcMaxColor = $mpMetaiZcMaxColor;
        return $this;
    }

    /**
     * Get mpMetaiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMpMetaiZcMaxColor()
    {
        return $this->mpMetaiZcMaxColor;
    }

    /**
     * Set mpMetaiZdMax
     *
     * @access public
     * @param float $mpMetaiZdMax
     * @return Measurement
     */
    public function setMpMetaiZdMax($mpMetaiZdMax = null)
    {
        $this->mpMetaiZdMax = $mpMetaiZdMax;
        return $this;
    }

    /**
     * Get mpMetaiZdMax
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiZdMax()
    {
        return $this->mpMetaiZdMax;
    }

    /**
     * Set mpMetaiZdMaxColor
     *
     * @access public
     * @param string $mpMetaiZdMaxColor
     * @return Measurement
     */
    public function setMpMetaiZdMaxColor($mpMetaiZdMaxColor = null)
    {
        $this->mpMetaiZdMaxColor = $mpMetaiZdMaxColor;
        return $this;
    }

    /**
     * Get mpMetaiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getMpMetaiZdMaxColor()
    {
        return $this->mpMetaiZdMaxColor;
    }

    /**
     * Set mpMetaiZone
     *
     * @access public
     * @param float $mpMetaiZone
     * @return Measurement
     */
    public function setMpMetaiZone($mpMetaiZone = null)
    {
        $this->mpMetaiZone = $mpMetaiZone;
        return $this;
    }

    /**
     * Get mpMetaiZone
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiZone()
    {
        return $this->mpMetaiZone;
    }

    /**
     * Set ffmi
     *
     * @access public
     * @param float $ffmi
     * @return Measurement
     */
    public function setFfmi($ffmi = null)
    {
        $this->ffmi = $ffmi;
        return $this;
    }

    /**
     * Get ffmi
     *
     * @access public
     * @return float 
     */
    public function getFfmi()
    {
        return $this->ffmi;
    }

    /**
     * Set ffmiRef
     *
     * @access public
     * @param float $ffmiRef
     * @return Measurement
     */
    public function setFfmiRef($ffmiRef = null)
    {
        $this->ffmiRef = $ffmiRef;
        return $this;
    }

    /**
     * Get ffmiRef
     *
     * @access public
     * @return float 
     */
    public function getFfmiRef()
    {
        return $this->ffmiRef;
    }

    /**
     * Set ffmRefKg
     *
     * @access public
     * @param float $ffmRefKg
     * @return Measurement
     */
    public function setFfmRefKg($ffmRefKg = null)
    {
        $this->ffmRefKg = $ffmRefKg;
        return $this;
    }

    /**
     * Get ffmRefKg
     *
     * @access public
     * @return float 
     */
    public function getFfmRefKg()
    {
        return $this->ffmRefKg;
    }

    /**
     * Set iffmi
     *
     * @access public
     * @param float $iffmi
     * @return Measurement
     */
    public function setIffmi($iffmi = null)
    {
        $this->iffmi = $iffmi;
        return $this;
    }

    /**
     * Get iffmi
     *
     * @access public
     * @return float 
     */
    public function getIffmi()
    {
        return $this->iffmi;
    }

    /**
     * Set iffmiStdA
     *
     * @access public
     * @param float $iffmiStdA
     * @return Measurement
     */
    public function setIffmiStdA($iffmiStdA = null)
    {
        $this->iffmiStdA = $iffmiStdA;
        return $this;
    }

    /**
     * Get iffmiStdA
     *
     * @access public
     * @return float 
     */
    public function getIffmiStdA()
    {
        return $this->iffmiStdA;
    }

    /**
     * Set iffmiStdB
     *
     * @access public
     * @param float $iffmiStdB
     * @return Measurement
     */
    public function setIffmiStdB($iffmiStdB = null)
    {
        $this->iffmiStdB = $iffmiStdB;
        return $this;
    }

    /**
     * Get iffmiStdB
     *
     * @access public
     * @return float 
     */
    public function getIffmiStdB()
    {
        return $this->iffmiStdB;
    }

    /**
     * Set iffmiStdC
     *
     * @access public
     * @param float $iffmiStdC
     * @return Measurement
     */
    public function setIffmiStdC($iffmiStdC = null)
    {
        $this->iffmiStdC = $iffmiStdC;
        return $this;
    }

    /**
     * Get iffmiStdC
     *
     * @access public
     * @return float 
     */
    public function getIffmiStdC()
    {
        return $this->iffmiStdC;
    }

    /**
     * Set iffmiStdD
     *
     * @access public
     * @param float $iffmiStdD
     * @return Measurement
     */
    public function setIffmiStdD($iffmiStdD = null)
    {
        $this->iffmiStdD = $iffmiStdD;
        return $this;
    }

    /**
     * Get iffmiStdD
     *
     * @access public
     * @return float 
     */
    public function getIffmiStdD()
    {
        return $this->iffmiStdD;
    }

    /**
     * Set iffmiZaMax
     *
     * @access public
     * @param float $iffmiZaMax
     * @return Measurement
     */
    public function setIffmiZaMax($iffmiZaMax = null)
    {
        $this->iffmiZaMax = $iffmiZaMax;
        return $this;
    }

    /**
     * Get iffmiZaMax
     *
     * @access public
     * @return float 
     */
    public function getIffmiZaMax()
    {
        return $this->iffmiZaMax;
    }

    /**
     * Set iffmiZaMaxColor
     *
     * @access public
     * @param string $iffmiZaMaxColor
     * @return Measurement
     */
    public function setIffmiZaMaxColor($iffmiZaMaxColor = null)
    {
        $this->iffmiZaMaxColor = $iffmiZaMaxColor;
        return $this;
    }

    /**
     * Get iffmiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIffmiZaMaxColor()
    {
        return $this->iffmiZaMaxColor;
    }

    /**
     * Set iffmiZbMax
     *
     * @access public
     * @param float $iffmiZbMax
     * @return Measurement
     */
    public function setIffmiZbMax($iffmiZbMax = null)
    {
        $this->iffmiZbMax = $iffmiZbMax;
        return $this;
    }

    /**
     * Get iffmiZbMax
     *
     * @access public
     * @return float 
     */
    public function getIffmiZbMax()
    {
        return $this->iffmiZbMax;
    }

    /**
     * Set iffmiZbMaxColor
     *
     * @access public
     * @param string $iffmiZbMaxColor
     * @return Measurement
     */
    public function setIffmiZbMaxColor($iffmiZbMaxColor = null)
    {
        $this->iffmiZbMaxColor = $iffmiZbMaxColor;
        return $this;
    }

    /**
     * Get iffmiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIffmiZbMaxColor()
    {
        return $this->iffmiZbMaxColor;
    }

    /**
     * Set iffmiZcMax
     *
     * @access public
     * @param float $iffmiZcMax
     * @return Measurement
     */
    public function setIffmiZcMax($iffmiZcMax = null)
    {
        $this->iffmiZcMax = $iffmiZcMax;
        return $this;
    }

    /**
     * Get iffmiZcMax
     *
     * @access public
     * @return float 
     */
    public function getIffmiZcMax()
    {
        return $this->iffmiZcMax;
    }

    /**
     * Set iffmiZcMaxColor
     *
     * @access public
     * @param string $iffmiZcMaxColor
     * @return Measurement
     */
    public function setIffmiZcMaxColor($iffmiZcMaxColor = null)
    {
        $this->iffmiZcMaxColor = $iffmiZcMaxColor;
        return $this;
    }

    /**
     * Get iffmiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIffmiZcMaxColor()
    {
        return $this->iffmiZcMaxColor;
    }

    /**
     * Set iffmiZdMax
     *
     * @access public
     * @param float $iffmiZdMax
     * @return Measurement
     */
    public function setIffmiZdMax($iffmiZdMax = null)
    {
        $this->iffmiZdMax = $iffmiZdMax;
        return $this;
    }

    /**
     * Get iffmiZdMax
     *
     * @access public
     * @return float 
     */
    public function getIffmiZdMax()
    {
        return $this->iffmiZdMax;
    }

    /**
     * Set iffmiZdMaxColor
     *
     * @access public
     * @param string $iffmiZdMaxColor
     * @return Measurement
     */
    public function setIffmiZdMaxColor($iffmiZdMaxColor = null)
    {
        $this->iffmiZdMaxColor = $iffmiZdMaxColor;
        return $this;
    }

    /**
     * Get iffmiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getIffmiZdMaxColor()
    {
        return $this->iffmiZdMaxColor;
    }

    /**
     * Set iffmiZone
     *
     * @access public
     * @param float $iffmiZone
     * @return Measurement
     */
    public function setIffmiZone($iffmiZone = null)
    {
        $this->iffmiZone = $iffmiZone;
        return $this;
    }

    /**
     * Get iffmiZone
     *
     * @access public
     * @return float 
     */
    public function getIffmiZone()
    {
        return $this->iffmiZone;
    }

    /**
     * Set bmri
     *
     * @access public
     * @param float $bmri
     * @return Measurement
     */
    public function setBmri($bmri = null)
    {
        $this->bmri = $bmri;
        return $this;
    }

    /**
     * Get bmri
     *
     * @access public
     * @return float 
     */
    public function getBmri()
    {
        return $this->bmri;
    }

    /**
     * Set bmriStdA
     *
     * @access public
     * @param float $bmriStdA
     * @return Measurement
     */
    public function setBmriStdA($bmriStdA = null)
    {
        $this->bmriStdA = $bmriStdA;
        return $this;
    }

    /**
     * Get bmriStdA
     *
     * @access public
     * @return float 
     */
    public function getBmriStdA()
    {
        return $this->bmriStdA;
    }

    /**
     * Set bmriStdB
     *
     * @access public
     * @param float $bmriStdB
     * @return Measurement
     */
    public function setBmriStdB($bmriStdB = null)
    {
        $this->bmriStdB = $bmriStdB;
        return $this;
    }

    /**
     * Get bmriStdB
     *
     * @access public
     * @return float 
     */
    public function getBmriStdB()
    {
        return $this->bmriStdB;
    }

    /**
     * Set bmriStdC
     *
     * @access public
     * @param float $bmriStdC
     * @return Measurement
     */
    public function setBmriStdC($bmriStdC = null)
    {
        $this->bmriStdC = $bmriStdC;
        return $this;
    }

    /**
     * Get bmriStdC
     *
     * @access public
     * @return float 
     */
    public function getBmriStdC()
    {
        return $this->bmriStdC;
    }

    /**
     * Set bmriStdD
     *
     * @access public
     * @param float $bmriStdD
     * @return Measurement
     */
    public function setBmriStdD($bmriStdD = null)
    {
        $this->bmriStdD = $bmriStdD;
        return $this;
    }

    /**
     * Get bmriStdD
     *
     * @access public
     * @return float 
     */
    public function getBmriStdD()
    {
        return $this->bmriStdD;
    }

    /**
     * Set bmriZaMax
     *
     * @access public
     * @param float $bmriZaMax
     * @return Measurement
     */
    public function setBmriZaMax($bmriZaMax = null)
    {
        $this->bmriZaMax = $bmriZaMax;
        return $this;
    }

    /**
     * Get bmriZaMax
     *
     * @access public
     * @return float 
     */
    public function getBmriZaMax()
    {
        return $this->bmriZaMax;
    }

    /**
     * Set bmriZaMaxColor
     *
     * @access public
     * @param string $bmriZaMaxColor
     * @return Measurement
     */
    public function setBmriZaMaxColor($bmriZaMaxColor = null)
    {
        $this->bmriZaMaxColor = $bmriZaMaxColor;
        return $this;
    }

    /**
     * Get bmriZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBmriZaMaxColor()
    {
        return $this->bmriZaMaxColor;
    }

    /**
     * Set bmriZbMax
     *
     * @access public
     * @param float $bmriZbMax
     * @return Measurement
     */
    public function setBmriZbMax($bmriZbMax = null)
    {
        $this->bmriZbMax = $bmriZbMax;
        return $this;
    }

    /**
     * Get bmriZbMax
     *
     * @access public
     * @return float 
     */
    public function getBmriZbMax()
    {
        return $this->bmriZbMax;
    }

    /**
     * Set bmriZbMaxColor
     *
     * @access public
     * @param string $bmriZbMaxColor
     * @return Measurement
     */
    public function setBmriZbMaxColor($bmriZbMaxColor = null)
    {
        $this->bmriZbMaxColor = $bmriZbMaxColor;
        return $this;
    }

    /**
     * Get bmriZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBmriZbMaxColor()
    {
        return $this->bmriZbMaxColor;
    }

    /**
     * Set bmriZcMax
     *
     * @access public
     * @param float $bmriZcMax
     * @return Measurement
     */
    public function setBmriZcMax($bmriZcMax = null)
    {
        $this->bmriZcMax = $bmriZcMax;
        return $this;
    }

    /**
     * Get bmriZcMax
     *
     * @access public
     * @return float 
     */
    public function getBmriZcMax()
    {
        return $this->bmriZcMax;
    }

    /**
     * Set bmriZcMaxColor
     *
     * @access public
     * @param string $bmriZcMaxColor
     * @return Measurement
     */
    public function setBmriZcMaxColor($bmriZcMaxColor = null)
    {
        $this->bmriZcMaxColor = $bmriZcMaxColor;
        return $this;
    }

    /**
     * Get bmriZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBmriZcMaxColor()
    {
        return $this->bmriZcMaxColor;
    }

    /**
     * Set bmriZdMax
     *
     * @access public
     * @param float $bmriZdMax
     * @return Measurement
     */
    public function setBmriZdMax($bmriZdMax = null)
    {
        $this->bmriZdMax = $bmriZdMax;
        return $this;
    }

    /**
     * Get bmriZdMax
     *
     * @access public
     * @return float 
     */
    public function getBmriZdMax()
    {
        return $this->bmriZdMax;
    }

    /**
     * Set bmriZdMaxColor
     *
     * @access public
     * @param string $bmriZdMaxColor
     * @return Measurement
     */
    public function setBmriZdMaxColor($bmriZdMaxColor = null)
    {
        $this->bmriZdMaxColor = $bmriZdMaxColor;
        return $this;
    }

    /**
     * Get bmriZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBmriZdMaxColor()
    {
        return $this->bmriZdMaxColor;
    }

    /**
     * Set bmriZone
     *
     * @access public
     * @param float $bmriZone
     * @return Measurement
     */
    public function setBmriZone($bmriZone = null)
    {
        $this->bmriZone = $bmriZone;
        return $this;
    }

    /**
     * Get bmriZone
     *
     * @access public
     * @return float 
     */
    public function getBmriZone()
    {
        return $this->bmriZone;
    }

    /**
     * Set ffecwPc100
     *
     * @access public
     * @param float $ffecwPc100
     * @return Measurement
     */
    public function setFfecwPc100($ffecwPc100 = null)
    {
        $this->ffecwPc100 = $ffecwPc100;
        return $this;
    }

    /**
     * Get ffecwPc100
     *
     * @access public
     * @return float 
     */
    public function getFfecwPc100()
    {
        return $this->ffecwPc100;
    }

    /**
     * Set ffecwi
     *
     * @access public
     * @param float $ffecwi
     * @return Measurement
     */
    public function setFfecwi($ffecwi = null)
    {
        $this->ffecwi = $ffecwi;
        return $this;
    }

    /**
     * Get ffecwi
     *
     * @access public
     * @return float 
     */
    public function getFfecwi()
    {
        return $this->ffecwi;
    }

    /**
     * Set ffecwPcStdA
     *
     * @access public
     * @param float $ffecwPcStdA
     * @return Measurement
     */
    public function setFfecwPcStdA($ffecwPcStdA = null)
    {
        $this->ffecwPcStdA = $ffecwPcStdA;
        return $this;
    }

    /**
     * Get ffecwPcStdA
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdA()
    {
        return $this->ffecwPcStdA;
    }

    /**
     * Set ffecwPcStdB
     *
     * @access public
     * @param float $ffecwPcStdB
     * @return Measurement
     */
    public function setFfecwPcStdB($ffecwPcStdB = null)
    {
        $this->ffecwPcStdB = $ffecwPcStdB;
        return $this;
    }

    /**
     * Get ffecwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdB()
    {
        return $this->ffecwPcStdB;
    }

    /**
     * Set ffecwPcStdC
     *
     * @access public
     * @param float $ffecwPcStdC
     * @return Measurement
     */
    public function setFfecwPcStdC($ffecwPcStdC = null)
    {
        $this->ffecwPcStdC = $ffecwPcStdC;
        return $this;
    }

    /**
     * Get ffecwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdC()
    {
        return $this->ffecwPcStdC;
    }

    /**
     * Set ffecwPcStdD
     *
     * @access public
     * @param float $ffecwPcStdD
     * @return Measurement
     */
    public function setFfecwPcStdD($ffecwPcStdD = null)
    {
        $this->ffecwPcStdD = $ffecwPcStdD;
        return $this;
    }

    /**
     * Get ffecwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdD()
    {
        return $this->ffecwPcStdD;
    }

    /**
     * Set ffecwPcStdE
     *
     * @access public
     * @param float $ffecwPcStdE
     * @return Measurement
     */
    public function setFfecwPcStdE($ffecwPcStdE = null)
    {
        $this->ffecwPcStdE = $ffecwPcStdE;
        return $this;
    }

    /**
     * Get ffecwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdE()
    {
        return $this->ffecwPcStdE;
    }

    /**
     * Set ffecwPcStdF
     *
     * @access public
     * @param float $ffecwPcStdF
     * @return Measurement
     */
    public function setFfecwPcStdF($ffecwPcStdF = null)
    {
        $this->ffecwPcStdF = $ffecwPcStdF;
        return $this;
    }

    /**
     * Get ffecwPcStdF
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdF()
    {
        return $this->ffecwPcStdF;
    }

    /**
     * Set ffecwPcStdG
     *
     * @access public
     * @param float $ffecwPcStdG
     * @return Measurement
     */
    public function setFfecwPcStdG($ffecwPcStdG = null)
    {
        $this->ffecwPcStdG = $ffecwPcStdG;
        return $this;
    }

    /**
     * Get ffecwPcStdG
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcStdG()
    {
        return $this->ffecwPcStdG;
    }

    /**
     * Set ffecwiStdA
     *
     * @access public
     * @param float $ffecwiStdA
     * @return Measurement
     */
    public function setFfecwiStdA($ffecwiStdA = null)
    {
        $this->ffecwiStdA = $ffecwiStdA;
        return $this;
    }

    /**
     * Get ffecwiStdA
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdA()
    {
        return $this->ffecwiStdA;
    }

    /**
     * Set ffecwiStdB
     *
     * @access public
     * @param float $ffecwiStdB
     * @return Measurement
     */
    public function setFfecwiStdB($ffecwiStdB = null)
    {
        $this->ffecwiStdB = $ffecwiStdB;
        return $this;
    }

    /**
     * Get ffecwiStdB
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdB()
    {
        return $this->ffecwiStdB;
    }

    /**
     * Set ffecwiStdC
     *
     * @access public
     * @param float $ffecwiStdC
     * @return Measurement
     */
    public function setFfecwiStdC($ffecwiStdC = null)
    {
        $this->ffecwiStdC = $ffecwiStdC;
        return $this;
    }

    /**
     * Get ffecwiStdC
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdC()
    {
        return $this->ffecwiStdC;
    }

    /**
     * Set ffecwiStdD
     *
     * @access public
     * @param float $ffecwiStdD
     * @return Measurement
     */
    public function setFfecwiStdD($ffecwiStdD = null)
    {
        $this->ffecwiStdD = $ffecwiStdD;
        return $this;
    }

    /**
     * Get ffecwiStdD
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdD()
    {
        return $this->ffecwiStdD;
    }

    /**
     * Set ffecwiStdE
     *
     * @access public
     * @param float $ffecwiStdE
     * @return Measurement
     */
    public function setFfecwiStdE($ffecwiStdE = null)
    {
        $this->ffecwiStdE = $ffecwiStdE;
        return $this;
    }

    /**
     * Get ffecwiStdE
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdE()
    {
        return $this->ffecwiStdE;
    }

    /**
     * Set ffecwiStdF
     *
     * @access public
     * @param float $ffecwiStdF
     * @return Measurement
     */
    public function setFfecwiStdF($ffecwiStdF = null)
    {
        $this->ffecwiStdF = $ffecwiStdF;
        return $this;
    }

    /**
     * Get ffecwiStdF
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdF()
    {
        return $this->ffecwiStdF;
    }

    /**
     * Set ffecwiStdG
     *
     * @access public
     * @param float $ffecwiStdG
     * @return Measurement
     */
    public function setFfecwiStdG($ffecwiStdG = null)
    {
        $this->ffecwiStdG = $ffecwiStdG;
        return $this;
    }

    /**
     * Get ffecwiStdG
     *
     * @access public
     * @return float 
     */
    public function getFfecwiStdG()
    {
        return $this->ffecwiStdG;
    }

    /**
     * Set ffecwPcZaMax
     *
     * @access public
     * @param float $ffecwPcZaMax
     * @return Measurement
     */
    public function setFfecwPcZaMax($ffecwPcZaMax = null)
    {
        $this->ffecwPcZaMax = $ffecwPcZaMax;
        return $this;
    }

    /**
     * Get ffecwPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZaMax()
    {
        return $this->ffecwPcZaMax;
    }

    /**
     * Set ffecwPcZaMaxColor
     *
     * @access public
     * @param string $ffecwPcZaMaxColor
     * @return Measurement
     */
    public function setFfecwPcZaMaxColor($ffecwPcZaMaxColor = null)
    {
        $this->ffecwPcZaMaxColor = $ffecwPcZaMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZaMaxColor()
    {
        return $this->ffecwPcZaMaxColor;
    }

    /**
     * Set ffecwPcZbMax
     *
     * @access public
     * @param float $ffecwPcZbMax
     * @return Measurement
     */
    public function setFfecwPcZbMax($ffecwPcZbMax = null)
    {
        $this->ffecwPcZbMax = $ffecwPcZbMax;
        return $this;
    }

    /**
     * Get ffecwPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZbMax()
    {
        return $this->ffecwPcZbMax;
    }

    /**
     * Set ffecwPcZbMaxColor
     *
     * @access public
     * @param string $ffecwPcZbMaxColor
     * @return Measurement
     */
    public function setFfecwPcZbMaxColor($ffecwPcZbMaxColor = null)
    {
        $this->ffecwPcZbMaxColor = $ffecwPcZbMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZbMaxColor()
    {
        return $this->ffecwPcZbMaxColor;
    }

    /**
     * Set ffecwPcZcMax
     *
     * @access public
     * @param float $ffecwPcZcMax
     * @return Measurement
     */
    public function setFfecwPcZcMax($ffecwPcZcMax = null)
    {
        $this->ffecwPcZcMax = $ffecwPcZcMax;
        return $this;
    }

    /**
     * Get ffecwPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZcMax()
    {
        return $this->ffecwPcZcMax;
    }

    /**
     * Set ffecwPcZcMaxColor
     *
     * @access public
     * @param string $ffecwPcZcMaxColor
     * @return Measurement
     */
    public function setFfecwPcZcMaxColor($ffecwPcZcMaxColor = null)
    {
        $this->ffecwPcZcMaxColor = $ffecwPcZcMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZcMaxColor()
    {
        return $this->ffecwPcZcMaxColor;
    }

    /**
     * Set ffecwPcZdMax
     *
     * @access public
     * @param float $ffecwPcZdMax
     * @return Measurement
     */
    public function setFfecwPcZdMax($ffecwPcZdMax = null)
    {
        $this->ffecwPcZdMax = $ffecwPcZdMax;
        return $this;
    }

    /**
     * Get ffecwPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZdMax()
    {
        return $this->ffecwPcZdMax;
    }

    /**
     * Set ffecwPcZdMaxColor
     *
     * @access public
     * @param string $ffecwPcZdMaxColor
     * @return Measurement
     */
    public function setFfecwPcZdMaxColor($ffecwPcZdMaxColor = null)
    {
        $this->ffecwPcZdMaxColor = $ffecwPcZdMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZdMaxColor()
    {
        return $this->ffecwPcZdMaxColor;
    }

    /**
     * Set ffecwPcZeMax
     *
     * @access public
     * @param float $ffecwPcZeMax
     * @return Measurement
     */
    public function setFfecwPcZeMax($ffecwPcZeMax = null)
    {
        $this->ffecwPcZeMax = $ffecwPcZeMax;
        return $this;
    }

    /**
     * Get ffecwPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZeMax()
    {
        return $this->ffecwPcZeMax;
    }

    /**
     * Set ffecwPcZeMaxColor
     *
     * @access public
     * @param string $ffecwPcZeMaxColor
     * @return Measurement
     */
    public function setFfecwPcZeMaxColor($ffecwPcZeMaxColor = null)
    {
        $this->ffecwPcZeMaxColor = $ffecwPcZeMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZeMaxColor()
    {
        return $this->ffecwPcZeMaxColor;
    }

    /**
     * Set ffecwPcZfMax
     *
     * @access public
     * @param float $ffecwPcZfMax
     * @return Measurement
     */
    public function setFfecwPcZfMax($ffecwPcZfMax = null)
    {
        $this->ffecwPcZfMax = $ffecwPcZfMax;
        return $this;
    }

    /**
     * Get ffecwPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZfMax()
    {
        return $this->ffecwPcZfMax;
    }

    /**
     * Set ffecwPcZfMaxColor
     *
     * @access public
     * @param string $ffecwPcZfMaxColor
     * @return Measurement
     */
    public function setFfecwPcZfMaxColor($ffecwPcZfMaxColor = null)
    {
        $this->ffecwPcZfMaxColor = $ffecwPcZfMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZfMaxColor()
    {
        return $this->ffecwPcZfMaxColor;
    }

    /**
     * Set ffecwPcZgMax
     *
     * @access public
     * @param float $ffecwPcZgMax
     * @return Measurement
     */
    public function setFfecwPcZgMax($ffecwPcZgMax = null)
    {
        $this->ffecwPcZgMax = $ffecwPcZgMax;
        return $this;
    }

    /**
     * Get ffecwPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZgMax()
    {
        return $this->ffecwPcZgMax;
    }

    /**
     * Set ffecwPcZgMaxColor
     *
     * @access public
     * @param string $ffecwPcZgMaxColor
     * @return Measurement
     */
    public function setFfecwPcZgMaxColor($ffecwPcZgMaxColor = null)
    {
        $this->ffecwPcZgMaxColor = $ffecwPcZgMaxColor;
        return $this;
    }

    /**
     * Get ffecwPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFfecwPcZgMaxColor()
    {
        return $this->ffecwPcZgMaxColor;
    }

    /**
     * Set ffecwPcZone
     *
     * @access public
     * @param float $ffecwPcZone
     * @return Measurement
     */
    public function setFfecwPcZone($ffecwPcZone = null)
    {
        $this->ffecwPcZone = $ffecwPcZone;
        return $this;
    }

    /**
     * Get ffecwPcZone
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcZone()
    {
        return $this->ffecwPcZone;
    }

    /**
     * Set fficwPc100
     *
     * @access public
     * @param float $fficwPc100
     * @return Measurement
     */
    public function setFficwPc100($fficwPc100 = null)
    {
        $this->fficwPc100 = $fficwPc100;
        return $this;
    }

    /**
     * Get fficwPc100
     *
     * @access public
     * @return float 
     */
    public function getFficwPc100()
    {
        return $this->fficwPc100;
    }

    /**
     * Set fficwi
     *
     * @access public
     * @param float $fficwi
     * @return Measurement
     */
    public function setFficwi($fficwi = null)
    {
        $this->fficwi = $fficwi;
        return $this;
    }

    /**
     * Get fficwi
     *
     * @access public
     * @return float 
     */
    public function getFficwi()
    {
        return $this->fficwi;
    }

    /**
     * Set fficwPcStdA
     *
     * @access public
     * @param float $fficwPcStdA
     * @return Measurement
     */
    public function setFficwPcStdA($fficwPcStdA = null)
    {
        $this->fficwPcStdA = $fficwPcStdA;
        return $this;
    }

    /**
     * Get fficwPcStdA
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdA()
    {
        return $this->fficwPcStdA;
    }

    /**
     * Set fficwPcStdB
     *
     * @access public
     * @param float $fficwPcStdB
     * @return Measurement
     */
    public function setFficwPcStdB($fficwPcStdB = null)
    {
        $this->fficwPcStdB = $fficwPcStdB;
        return $this;
    }

    /**
     * Get fficwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdB()
    {
        return $this->fficwPcStdB;
    }

    /**
     * Set fficwPcStdC
     *
     * @access public
     * @param float $fficwPcStdC
     * @return Measurement
     */
    public function setFficwPcStdC($fficwPcStdC = null)
    {
        $this->fficwPcStdC = $fficwPcStdC;
        return $this;
    }

    /**
     * Get fficwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdC()
    {
        return $this->fficwPcStdC;
    }

    /**
     * Set fficwPcStdD
     *
     * @access public
     * @param float $fficwPcStdD
     * @return Measurement
     */
    public function setFficwPcStdD($fficwPcStdD = null)
    {
        $this->fficwPcStdD = $fficwPcStdD;
        return $this;
    }

    /**
     * Get fficwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdD()
    {
        return $this->fficwPcStdD;
    }

    /**
     * Set fficwPcStdE
     *
     * @access public
     * @param float $fficwPcStdE
     * @return Measurement
     */
    public function setFficwPcStdE($fficwPcStdE = null)
    {
        $this->fficwPcStdE = $fficwPcStdE;
        return $this;
    }

    /**
     * Get fficwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdE()
    {
        return $this->fficwPcStdE;
    }

    /**
     * Set fficwPcStdF
     *
     * @access public
     * @param float $fficwPcStdF
     * @return Measurement
     */
    public function setFficwPcStdF($fficwPcStdF = null)
    {
        $this->fficwPcStdF = $fficwPcStdF;
        return $this;
    }

    /**
     * Get fficwPcStdF
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdF()
    {
        return $this->fficwPcStdF;
    }

    /**
     * Set fficwPcStdG
     *
     * @access public
     * @param float $fficwPcStdG
     * @return Measurement
     */
    public function setFficwPcStdG($fficwPcStdG = null)
    {
        $this->fficwPcStdG = $fficwPcStdG;
        return $this;
    }

    /**
     * Get fficwPcStdG
     *
     * @access public
     * @return float 
     */
    public function getFficwPcStdG()
    {
        return $this->fficwPcStdG;
    }

    /**
     * Set fficwiStdA
     *
     * @access public
     * @param float $fficwiStdA
     * @return Measurement
     */
    public function setFficwiStdA($fficwiStdA = null)
    {
        $this->fficwiStdA = $fficwiStdA;
        return $this;
    }

    /**
     * Get fficwiStdA
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdA()
    {
        return $this->fficwiStdA;
    }

    /**
     * Set fficwiStdB
     *
     * @access public
     * @param float $fficwiStdB
     * @return Measurement
     */
    public function setFficwiStdB($fficwiStdB = null)
    {
        $this->fficwiStdB = $fficwiStdB;
        return $this;
    }

    /**
     * Get fficwiStdB
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdB()
    {
        return $this->fficwiStdB;
    }

    /**
     * Set fficwiStdC
     *
     * @access public
     * @param float $fficwiStdC
     * @return Measurement
     */
    public function setFficwiStdC($fficwiStdC = null)
    {
        $this->fficwiStdC = $fficwiStdC;
        return $this;
    }

    /**
     * Get fficwiStdC
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdC()
    {
        return $this->fficwiStdC;
    }

    /**
     * Set fficwiStdD
     *
     * @access public
     * @param float $fficwiStdD
     * @return Measurement
     */
    public function setFficwiStdD($fficwiStdD = null)
    {
        $this->fficwiStdD = $fficwiStdD;
        return $this;
    }

    /**
     * Get fficwiStdD
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdD()
    {
        return $this->fficwiStdD;
    }

    /**
     * Set fficwiStdE
     *
     * @access public
     * @param float $fficwiStdE
     * @return Measurement
     */
    public function setFficwiStdE($fficwiStdE = null)
    {
        $this->fficwiStdE = $fficwiStdE;
        return $this;
    }

    /**
     * Get fficwiStdE
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdE()
    {
        return $this->fficwiStdE;
    }

    /**
     * Set fficwiStdF
     *
     * @access public
     * @param float $fficwiStdF
     * @return Measurement
     */
    public function setFficwiStdF($fficwiStdF = null)
    {
        $this->fficwiStdF = $fficwiStdF;
        return $this;
    }

    /**
     * Get fficwiStdF
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdF()
    {
        return $this->fficwiStdF;
    }

    /**
     * Set fficwiStdG
     *
     * @access public
     * @param float $fficwiStdG
     * @return Measurement
     */
    public function setFficwiStdG($fficwiStdG = null)
    {
        $this->fficwiStdG = $fficwiStdG;
        return $this;
    }

    /**
     * Get fficwiStdG
     *
     * @access public
     * @return float 
     */
    public function getFficwiStdG()
    {
        return $this->fficwiStdG;
    }

    /**
     * Set fficwPcZaMax
     *
     * @access public
     * @param float $fficwPcZaMax
     * @return Measurement
     */
    public function setFficwPcZaMax($fficwPcZaMax = null)
    {
        $this->fficwPcZaMax = $fficwPcZaMax;
        return $this;
    }

    /**
     * Get fficwPcZaMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZaMax()
    {
        return $this->fficwPcZaMax;
    }

    /**
     * Set fficwPcZaMaxColor
     *
     * @access public
     * @param string $fficwPcZaMaxColor
     * @return Measurement
     */
    public function setFficwPcZaMaxColor($fficwPcZaMaxColor = null)
    {
        $this->fficwPcZaMaxColor = $fficwPcZaMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZaMaxColor()
    {
        return $this->fficwPcZaMaxColor;
    }

    /**
     * Set fficwPcZbMax
     *
     * @access public
     * @param float $fficwPcZbMax
     * @return Measurement
     */
    public function setFficwPcZbMax($fficwPcZbMax = null)
    {
        $this->fficwPcZbMax = $fficwPcZbMax;
        return $this;
    }

    /**
     * Get fficwPcZbMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZbMax()
    {
        return $this->fficwPcZbMax;
    }

    /**
     * Set fficwPcZbMaxColor
     *
     * @access public
     * @param string $fficwPcZbMaxColor
     * @return Measurement
     */
    public function setFficwPcZbMaxColor($fficwPcZbMaxColor = null)
    {
        $this->fficwPcZbMaxColor = $fficwPcZbMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZbMaxColor()
    {
        return $this->fficwPcZbMaxColor;
    }

    /**
     * Set fficwPcZcMax
     *
     * @access public
     * @param float $fficwPcZcMax
     * @return Measurement
     */
    public function setFficwPcZcMax($fficwPcZcMax = null)
    {
        $this->fficwPcZcMax = $fficwPcZcMax;
        return $this;
    }

    /**
     * Get fficwPcZcMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZcMax()
    {
        return $this->fficwPcZcMax;
    }

    /**
     * Set fficwPcZcMaxColor
     *
     * @access public
     * @param string $fficwPcZcMaxColor
     * @return Measurement
     */
    public function setFficwPcZcMaxColor($fficwPcZcMaxColor = null)
    {
        $this->fficwPcZcMaxColor = $fficwPcZcMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZcMaxColor()
    {
        return $this->fficwPcZcMaxColor;
    }

    /**
     * Set fficwPcZdMax
     *
     * @access public
     * @param float $fficwPcZdMax
     * @return Measurement
     */
    public function setFficwPcZdMax($fficwPcZdMax = null)
    {
        $this->fficwPcZdMax = $fficwPcZdMax;
        return $this;
    }

    /**
     * Get fficwPcZdMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZdMax()
    {
        return $this->fficwPcZdMax;
    }

    /**
     * Set fficwPcZdMaxColor
     *
     * @access public
     * @param string $fficwPcZdMaxColor
     * @return Measurement
     */
    public function setFficwPcZdMaxColor($fficwPcZdMaxColor = null)
    {
        $this->fficwPcZdMaxColor = $fficwPcZdMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZdMaxColor()
    {
        return $this->fficwPcZdMaxColor;
    }

    /**
     * Set fficwPcZeMax
     *
     * @access public
     * @param float $fficwPcZeMax
     * @return Measurement
     */
    public function setFficwPcZeMax($fficwPcZeMax = null)
    {
        $this->fficwPcZeMax = $fficwPcZeMax;
        return $this;
    }

    /**
     * Get fficwPcZeMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZeMax()
    {
        return $this->fficwPcZeMax;
    }

    /**
     * Set fficwPcZeMaxColor
     *
     * @access public
     * @param string $fficwPcZeMaxColor
     * @return Measurement
     */
    public function setFficwPcZeMaxColor($fficwPcZeMaxColor = null)
    {
        $this->fficwPcZeMaxColor = $fficwPcZeMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZeMaxColor()
    {
        return $this->fficwPcZeMaxColor;
    }

    /**
     * Set fficwPcZfMax
     *
     * @access public
     * @param float $fficwPcZfMax
     * @return Measurement
     */
    public function setFficwPcZfMax($fficwPcZfMax = null)
    {
        $this->fficwPcZfMax = $fficwPcZfMax;
        return $this;
    }

    /**
     * Get fficwPcZfMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZfMax()
    {
        return $this->fficwPcZfMax;
    }

    /**
     * Set fficwPcZfMaxColor
     *
     * @access public
     * @param string $fficwPcZfMaxColor
     * @return Measurement
     */
    public function setFficwPcZfMaxColor($fficwPcZfMaxColor = null)
    {
        $this->fficwPcZfMaxColor = $fficwPcZfMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZfMaxColor()
    {
        return $this->fficwPcZfMaxColor;
    }

    /**
     * Set fficwPcZgMax
     *
     * @access public
     * @param float $fficwPcZgMax
     * @return Measurement
     */
    public function setFficwPcZgMax($fficwPcZgMax = null)
    {
        $this->fficwPcZgMax = $fficwPcZgMax;
        return $this;
    }

    /**
     * Get fficwPcZgMax
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZgMax()
    {
        return $this->fficwPcZgMax;
    }

    /**
     * Set fficwPcZgMaxColor
     *
     * @access public
     * @param string $fficwPcZgMaxColor
     * @return Measurement
     */
    public function setFficwPcZgMaxColor($fficwPcZgMaxColor = null)
    {
        $this->fficwPcZgMaxColor = $fficwPcZgMaxColor;
        return $this;
    }

    /**
     * Get fficwPcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFficwPcZgMaxColor()
    {
        return $this->fficwPcZgMaxColor;
    }

    /**
     * Set fficwPcZone
     *
     * @access public
     * @param float $fficwPcZone
     * @return Measurement
     */
    public function setFficwPcZone($fficwPcZone = null)
    {
        $this->fficwPcZone = $fficwPcZone;
        return $this;
    }

    /**
     * Get fficwPcZone
     *
     * @access public
     * @return float 
     */
    public function getFficwPcZone()
    {
        return $this->fficwPcZone;
    }

    /**
     * Set asmhiStdA
     *
     * @access public
     * @param float $asmhiStdA
     * @return Measurement
     */
    public function setAsmhiStdA($asmhiStdA = null)
    {
        $this->asmhiStdA = $asmhiStdA;
        return $this;
    }

    /**
     * Get asmhiStdA
     *
     * @access public
     * @return float 
     */
    public function getAsmhiStdA()
    {
        return $this->asmhiStdA;
    }

    /**
     * Set asmhiStdB
     *
     * @access public
     * @param float $asmhiStdB
     * @return Measurement
     */
    public function setAsmhiStdB($asmhiStdB = null)
    {
        $this->asmhiStdB = $asmhiStdB;
        return $this;
    }

    /**
     * Get asmhiStdB
     *
     * @access public
     * @return float 
     */
    public function getAsmhiStdB()
    {
        return $this->asmhiStdB;
    }

    /**
     * Set asmhiStdC
     *
     * @access public
     * @param float $asmhiStdC
     * @return Measurement
     */
    public function setAsmhiStdC($asmhiStdC = null)
    {
        $this->asmhiStdC = $asmhiStdC;
        return $this;
    }

    /**
     * Get asmhiStdC
     *
     * @access public
     * @return float 
     */
    public function getAsmhiStdC()
    {
        return $this->asmhiStdC;
    }

    /**
     * Set asmhiStdD
     *
     * @access public
     * @param float $asmhiStdD
     * @return Measurement
     */
    public function setAsmhiStdD($asmhiStdD = null)
    {
        $this->asmhiStdD = $asmhiStdD;
        return $this;
    }

    /**
     * Get asmhiStdD
     *
     * @access public
     * @return float 
     */
    public function getAsmhiStdD()
    {
        return $this->asmhiStdD;
    }

    /**
     * Set asmhiZaMax
     *
     * @access public
     * @param float $asmhiZaMax
     * @return Measurement
     */
    public function setAsmhiZaMax($asmhiZaMax = null)
    {
        $this->asmhiZaMax = $asmhiZaMax;
        return $this;
    }

    /**
     * Get asmhiZaMax
     *
     * @access public
     * @return float 
     */
    public function getAsmhiZaMax()
    {
        return $this->asmhiZaMax;
    }

    /**
     * Set asmhiZaMaxColor
     *
     * @access public
     * @param string $asmhiZaMaxColor
     * @return Measurement
     */
    public function setAsmhiZaMaxColor($asmhiZaMaxColor = null)
    {
        $this->asmhiZaMaxColor = $asmhiZaMaxColor;
        return $this;
    }

    /**
     * Get asmhiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmhiZaMaxColor()
    {
        return $this->asmhiZaMaxColor;
    }

    /**
     * Set asmhiZbMax
     *
     * @access public
     * @param float $asmhiZbMax
     * @return Measurement
     */
    public function setAsmhiZbMax($asmhiZbMax = null)
    {
        $this->asmhiZbMax = $asmhiZbMax;
        return $this;
    }

    /**
     * Get asmhiZbMax
     *
     * @access public
     * @return float 
     */
    public function getAsmhiZbMax()
    {
        return $this->asmhiZbMax;
    }

    /**
     * Set asmhiZbMaxColor
     *
     * @access public
     * @param string $asmhiZbMaxColor
     * @return Measurement
     */
    public function setAsmhiZbMaxColor($asmhiZbMaxColor = null)
    {
        $this->asmhiZbMaxColor = $asmhiZbMaxColor;
        return $this;
    }

    /**
     * Get asmhiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmhiZbMaxColor()
    {
        return $this->asmhiZbMaxColor;
    }

    /**
     * Set asmhiZcMax
     *
     * @access public
     * @param float $asmhiZcMax
     * @return Measurement
     */
    public function setAsmhiZcMax($asmhiZcMax = null)
    {
        $this->asmhiZcMax = $asmhiZcMax;
        return $this;
    }

    /**
     * Get asmhiZcMax
     *
     * @access public
     * @return float 
     */
    public function getAsmhiZcMax()
    {
        return $this->asmhiZcMax;
    }

    /**
     * Set asmhiZcMaxColor
     *
     * @access public
     * @param string $asmhiZcMaxColor
     * @return Measurement
     */
    public function setAsmhiZcMaxColor($asmhiZcMaxColor = null)
    {
        $this->asmhiZcMaxColor = $asmhiZcMaxColor;
        return $this;
    }

    /**
     * Get asmhiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmhiZcMaxColor()
    {
        return $this->asmhiZcMaxColor;
    }

    /**
     * Set asmhiZdMax
     *
     * @access public
     * @param float $asmhiZdMax
     * @return Measurement
     */
    public function setAsmhiZdMax($asmhiZdMax = null)
    {
        $this->asmhiZdMax = $asmhiZdMax;
        return $this;
    }

    /**
     * Get asmhiZdMax
     *
     * @access public
     * @return float 
     */
    public function getAsmhiZdMax()
    {
        return $this->asmhiZdMax;
    }

    /**
     * Set asmhiZdMaxColor
     *
     * @access public
     * @param string $asmhiZdMaxColor
     * @return Measurement
     */
    public function setAsmhiZdMaxColor($asmhiZdMaxColor = null)
    {
        $this->asmhiZdMaxColor = $asmhiZdMaxColor;
        return $this;
    }

    /**
     * Get asmhiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getAsmhiZdMaxColor()
    {
        return $this->asmhiZdMaxColor;
    }

    /**
     * Set asmhiZone
     *
     * @access public
     * @param float $asmhiZone
     * @return Measurement
     */
    public function setAsmhiZone($asmhiZone = null)
    {
        $this->asmhiZone = $asmhiZone;
        return $this;
    }

    /**
     * Get asmhiZone
     *
     * @access public
     * @return float 
     */
    public function getAsmhiZone()
    {
        return $this->asmhiZone;
    }

    /**
     * Set bcmi
     *
     * @access public
     * @param float $bcmi
     * @return Measurement
     */
    public function setBcmi($bcmi = null)
    {
        $this->bcmi = $bcmi;
        return $this;
    }

    /**
     * Get bcmi
     *
     * @access public
     * @return float 
     */
    public function getBcmi()
    {
        return $this->bcmi;
    }

    /**
     * Set bcmiStdA
     *
     * @access public
     * @param float $bcmiStdA
     * @return Measurement
     */
    public function setBcmiStdA($bcmiStdA = null)
    {
        $this->bcmiStdA = $bcmiStdA;
        return $this;
    }

    /**
     * Get bcmiStdA
     *
     * @access public
     * @return float 
     */
    public function getBcmiStdA()
    {
        return $this->bcmiStdA;
    }

    /**
     * Set bcmiStdB
     *
     * @access public
     * @param float $bcmiStdB
     * @return Measurement
     */
    public function setBcmiStdB($bcmiStdB = null)
    {
        $this->bcmiStdB = $bcmiStdB;
        return $this;
    }

    /**
     * Get bcmiStdB
     *
     * @access public
     * @return float 
     */
    public function getBcmiStdB()
    {
        return $this->bcmiStdB;
    }

    /**
     * Set bcmiStdC
     *
     * @access public
     * @param float $bcmiStdC
     * @return Measurement
     */
    public function setBcmiStdC($bcmiStdC = null)
    {
        $this->bcmiStdC = $bcmiStdC;
        return $this;
    }

    /**
     * Get bcmiStdC
     *
     * @access public
     * @return float 
     */
    public function getBcmiStdC()
    {
        return $this->bcmiStdC;
    }

    /**
     * Set bcmiStdD
     *
     * @access public
     * @param float $bcmiStdD
     * @return Measurement
     */
    public function setBcmiStdD($bcmiStdD = null)
    {
        $this->bcmiStdD = $bcmiStdD;
        return $this;
    }

    /**
     * Get bcmiStdD
     *
     * @access public
     * @return float 
     */
    public function getBcmiStdD()
    {
        return $this->bcmiStdD;
    }

    /**
     * Set bcmiZaMax
     *
     * @access public
     * @param float $bcmiZaMax
     * @return Measurement
     */
    public function setBcmiZaMax($bcmiZaMax = null)
    {
        $this->bcmiZaMax = $bcmiZaMax;
        return $this;
    }

    /**
     * Get bcmiZaMax
     *
     * @access public
     * @return float 
     */
    public function getBcmiZaMax()
    {
        return $this->bcmiZaMax;
    }

    /**
     * Set bcmiZaMaxColor
     *
     * @access public
     * @param string $bcmiZaMaxColor
     * @return Measurement
     */
    public function setBcmiZaMaxColor($bcmiZaMaxColor = null)
    {
        $this->bcmiZaMaxColor = $bcmiZaMaxColor;
        return $this;
    }

    /**
     * Get bcmiZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBcmiZaMaxColor()
    {
        return $this->bcmiZaMaxColor;
    }

    /**
     * Set bcmiZbMax
     *
     * @access public
     * @param float $bcmiZbMax
     * @return Measurement
     */
    public function setBcmiZbMax($bcmiZbMax = null)
    {
        $this->bcmiZbMax = $bcmiZbMax;
        return $this;
    }

    /**
     * Get bcmiZbMax
     *
     * @access public
     * @return float 
     */
    public function getBcmiZbMax()
    {
        return $this->bcmiZbMax;
    }

    /**
     * Set bcmiZbMaxColor
     *
     * @access public
     * @param string $bcmiZbMaxColor
     * @return Measurement
     */
    public function setBcmiZbMaxColor($bcmiZbMaxColor = null)
    {
        $this->bcmiZbMaxColor = $bcmiZbMaxColor;
        return $this;
    }

    /**
     * Get bcmiZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBcmiZbMaxColor()
    {
        return $this->bcmiZbMaxColor;
    }

    /**
     * Set bcmiZcMax
     *
     * @access public
     * @param float $bcmiZcMax
     * @return Measurement
     */
    public function setBcmiZcMax($bcmiZcMax = null)
    {
        $this->bcmiZcMax = $bcmiZcMax;
        return $this;
    }

    /**
     * Get bcmiZcMax
     *
     * @access public
     * @return float 
     */
    public function getBcmiZcMax()
    {
        return $this->bcmiZcMax;
    }

    /**
     * Set bcmiZcMaxColor
     *
     * @access public
     * @param string $bcmiZcMaxColor
     * @return Measurement
     */
    public function setBcmiZcMaxColor($bcmiZcMaxColor = null)
    {
        $this->bcmiZcMaxColor = $bcmiZcMaxColor;
        return $this;
    }

    /**
     * Get bcmiZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBcmiZcMaxColor()
    {
        return $this->bcmiZcMaxColor;
    }

    /**
     * Set bcmiZdMax
     *
     * @access public
     * @param float $bcmiZdMax
     * @return Measurement
     */
    public function setBcmiZdMax($bcmiZdMax = null)
    {
        $this->bcmiZdMax = $bcmiZdMax;
        return $this;
    }

    /**
     * Get bcmiZdMax
     *
     * @access public
     * @return float 
     */
    public function getBcmiZdMax()
    {
        return $this->bcmiZdMax;
    }

    /**
     * Set bcmiZdMaxColor
     *
     * @access public
     * @param string $bcmiZdMaxColor
     * @return Measurement
     */
    public function setBcmiZdMaxColor($bcmiZdMaxColor = null)
    {
        $this->bcmiZdMaxColor = $bcmiZdMaxColor;
        return $this;
    }

    /**
     * Get bcmiZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getBcmiZdMaxColor()
    {
        return $this->bcmiZdMaxColor;
    }

    /**
     * Set bcmiZone
     *
     * @access public
     * @param float $bcmiZone
     * @return Measurement
     */
    public function setBcmiZone($bcmiZone = null)
    {
        $this->bcmiZone = $bcmiZone;
        return $this;
    }

    /**
     * Get bcmiZone
     *
     * @access public
     * @return float 
     */
    public function getBcmiZone()
    {
        return $this->bcmiZone;
    }

    /**
     * Set imcNorms
     *
     * @access public
     * @param float $imcNorms
     * @return Measurement
     */
    public function setImcNorms($imcNorms = null)
    {
        $this->imcNorms = $imcNorms;
        return $this;
    }

    /**
     * Get imcNorms
     *
     * @access public
     * @return float 
     */
    public function getImcNorms()
    {
        return $this->imcNorms;
    }

    /**
     * Set imcStdA
     *
     * @access public
     * @param float $imcStdA
     * @return Measurement
     */
    public function setImcStdA($imcStdA = null)
    {
        $this->imcStdA = $imcStdA;
        return $this;
    }

    /**
     * Get imcStdA
     *
     * @access public
     * @return float 
     */
    public function getImcStdA()
    {
        return $this->imcStdA;
    }

    /**
     * Set imcStdB
     *
     * @access public
     * @param float $imcStdB
     * @return Measurement
     */
    public function setImcStdB($imcStdB = null)
    {
        $this->imcStdB = $imcStdB;
        return $this;
    }

    /**
     * Get imcStdB
     *
     * @access public
     * @return float 
     */
    public function getImcStdB()
    {
        return $this->imcStdB;
    }

    /**
     * Set imcStdC
     *
     * @access public
     * @param float $imcStdC
     * @return Measurement
     */
    public function setImcStdC($imcStdC = null)
    {
        $this->imcStdC = $imcStdC;
        return $this;
    }

    /**
     * Get imcStdC
     *
     * @access public
     * @return float 
     */
    public function getImcStdC()
    {
        return $this->imcStdC;
    }

    /**
     * Set imcStdD
     *
     * @access public
     * @param float $imcStdD
     * @return Measurement
     */
    public function setImcStdD($imcStdD = null)
    {
        $this->imcStdD = $imcStdD;
        return $this;
    }

    /**
     * Get imcStdD
     *
     * @access public
     * @return float 
     */
    public function getImcStdD()
    {
        return $this->imcStdD;
    }

    /**
     * Set imcStdE
     *
     * @access public
     * @param float $imcStdE
     * @return Measurement
     */
    public function setImcStdE($imcStdE = null)
    {
        $this->imcStdE = $imcStdE;
        return $this;
    }

    /**
     * Get imcStdE
     *
     * @access public
     * @return float 
     */
    public function getImcStdE()
    {
        return $this->imcStdE;
    }

    /**
     * Set imcStdF
     *
     * @access public
     * @param float $imcStdF
     * @return Measurement
     */
    public function setImcStdF($imcStdF = null)
    {
        $this->imcStdF = $imcStdF;
        return $this;
    }

    /**
     * Get imcStdF
     *
     * @access public
     * @return float 
     */
    public function getImcStdF()
    {
        return $this->imcStdF;
    }

    /**
     * Set imcStdG
     *
     * @access public
     * @param float $imcStdG
     * @return Measurement
     */
    public function setImcStdG($imcStdG = null)
    {
        $this->imcStdG = $imcStdG;
        return $this;
    }

    /**
     * Get imcStdG
     *
     * @access public
     * @return float 
     */
    public function getImcStdG()
    {
        return $this->imcStdG;
    }

    /**
     * Set imcZaMax
     *
     * @access public
     * @param float $imcZaMax
     * @return Measurement
     */
    public function setImcZaMax($imcZaMax = null)
    {
        $this->imcZaMax = $imcZaMax;
        return $this;
    }

    /**
     * Get imcZaMax
     *
     * @access public
     * @return float 
     */
    public function getImcZaMax()
    {
        return $this->imcZaMax;
    }

    /**
     * Set imcZaMaxColor
     *
     * @access public
     * @param string $imcZaMaxColor
     * @return Measurement
     */
    public function setImcZaMaxColor($imcZaMaxColor = null)
    {
        $this->imcZaMaxColor = $imcZaMaxColor;
        return $this;
    }

    /**
     * Get imcZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZaMaxColor()
    {
        return $this->imcZaMaxColor;
    }

    /**
     * Set imcZbMax
     *
     * @access public
     * @param float $imcZbMax
     * @return Measurement
     */
    public function setImcZbMax($imcZbMax = null)
    {
        $this->imcZbMax = $imcZbMax;
        return $this;
    }

    /**
     * Get imcZbMax
     *
     * @access public
     * @return float 
     */
    public function getImcZbMax()
    {
        return $this->imcZbMax;
    }

    /**
     * Set imcZbMaxColor
     *
     * @access public
     * @param string $imcZbMaxColor
     * @return Measurement
     */
    public function setImcZbMaxColor($imcZbMaxColor = null)
    {
        $this->imcZbMaxColor = $imcZbMaxColor;
        return $this;
    }

    /**
     * Get imcZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZbMaxColor()
    {
        return $this->imcZbMaxColor;
    }

    /**
     * Set imcZcMax
     *
     * @access public
     * @param float $imcZcMax
     * @return Measurement
     */
    public function setImcZcMax($imcZcMax = null)
    {
        $this->imcZcMax = $imcZcMax;
        return $this;
    }

    /**
     * Get imcZcMax
     *
     * @access public
     * @return float 
     */
    public function getImcZcMax()
    {
        return $this->imcZcMax;
    }

    /**
     * Set imcZcMaxColor
     *
     * @access public
     * @param string $imcZcMaxColor
     * @return Measurement
     */
    public function setImcZcMaxColor($imcZcMaxColor = null)
    {
        $this->imcZcMaxColor = $imcZcMaxColor;
        return $this;
    }

    /**
     * Get imcZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZcMaxColor()
    {
        return $this->imcZcMaxColor;
    }

    /**
     * Set imcZdMax
     *
     * @access public
     * @param float $imcZdMax
     * @return Measurement
     */
    public function setImcZdMax($imcZdMax = null)
    {
        $this->imcZdMax = $imcZdMax;
        return $this;
    }

    /**
     * Get imcZdMax
     *
     * @access public
     * @return float 
     */
    public function getImcZdMax()
    {
        return $this->imcZdMax;
    }

    /**
     * Set imcZdMaxColor
     *
     * @access public
     * @param string $imcZdMaxColor
     * @return Measurement
     */
    public function setImcZdMaxColor($imcZdMaxColor = null)
    {
        $this->imcZdMaxColor = $imcZdMaxColor;
        return $this;
    }

    /**
     * Get imcZdMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZdMaxColor()
    {
        return $this->imcZdMaxColor;
    }

    /**
     * Set imcZeMax
     *
     * @access public
     * @param float $imcZeMax
     * @return Measurement
     */
    public function setImcZeMax($imcZeMax = null)
    {
        $this->imcZeMax = $imcZeMax;
        return $this;
    }

    /**
     * Get imcZeMax
     *
     * @access public
     * @return float 
     */
    public function getImcZeMax()
    {
        return $this->imcZeMax;
    }

    /**
     * Set imcZeMaxColor
     *
     * @access public
     * @param string $imcZeMaxColor
     * @return Measurement
     */
    public function setImcZeMaxColor($imcZeMaxColor = null)
    {
        $this->imcZeMaxColor = $imcZeMaxColor;
        return $this;
    }

    /**
     * Get imcZeMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZeMaxColor()
    {
        return $this->imcZeMaxColor;
    }

    /**
     * Set imcZfMax
     *
     * @access public
     * @param float $imcZfMax
     * @return Measurement
     */
    public function setImcZfMax($imcZfMax = null)
    {
        $this->imcZfMax = $imcZfMax;
        return $this;
    }

    /**
     * Get imcZfMax
     *
     * @access public
     * @return float 
     */
    public function getImcZfMax()
    {
        return $this->imcZfMax;
    }

    /**
     * Set imcZfMaxColor
     *
     * @access public
     * @param string $imcZfMaxColor
     * @return Measurement
     */
    public function setImcZfMaxColor($imcZfMaxColor = null)
    {
        $this->imcZfMaxColor = $imcZfMaxColor;
        return $this;
    }

    /**
     * Get imcZfMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZfMaxColor()
    {
        return $this->imcZfMaxColor;
    }

    /**
     * Set imcZgMax
     *
     * @access public
     * @param float $imcZgMax
     * @return Measurement
     */
    public function setImcZgMax($imcZgMax = null)
    {
        $this->imcZgMax = $imcZgMax;
        return $this;
    }

    /**
     * Get imcZgMax
     *
     * @access public
     * @return float 
     */
    public function getImcZgMax()
    {
        return $this->imcZgMax;
    }

    /**
     * Set imcZgMaxColor
     *
     * @access public
     * @param string $imcZgMaxColor
     * @return Measurement
     */
    public function setImcZgMaxColor($imcZgMaxColor = null)
    {
        $this->imcZgMaxColor = $imcZgMaxColor;
        return $this;
    }

    /**
     * Get imcZgMaxColor
     *
     * @access public
     * @return string 
     */
    public function getImcZgMaxColor()
    {
        return $this->imcZgMaxColor;
    }

    /**
     * Set imcZone
     *
     * @access public
     * @param float $imcZone
     * @return Measurement
     */
    public function setImcZone($imcZone = null)
    {
        $this->imcZone = $imcZone;
        return $this;
    }

    /**
     * Get imcZone
     *
     * @access public
     * @return float 
     */
    public function getImcZone()
    {
        return $this->imcZone;
    }

    /**
     * Set fmslmirZaMax
     *
     * @access public
     * @param float $fmslmirZaMax
     * @return Measurement
     */
    public function setFmslmirZaMax($fmslmirZaMax = null)
    {
        $this->fmslmirZaMax = $fmslmirZaMax;
        return $this;
    }

    /**
     * Get fmslmirZaMax
     *
     * @access public
     * @return float 
     */
    public function getFmslmirZaMax()
    {
        return $this->fmslmirZaMax;
    }

    /**
     * Set fmslmirZaMaxColor
     *
     * @access public
     * @param string $fmslmirZaMaxColor
     * @return Measurement
     */
    public function setFmslmirZaMaxColor($fmslmirZaMaxColor = null)
    {
        $this->fmslmirZaMaxColor = $fmslmirZaMaxColor;
        return $this;
    }

    /**
     * Get fmslmirZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmslmirZaMaxColor()
    {
        return $this->fmslmirZaMaxColor;
    }

    /**
     * Set fmslmirZbMax
     *
     * @access public
     * @param float $fmslmirZbMax
     * @return Measurement
     */
    public function setFmslmirZbMax($fmslmirZbMax = null)
    {
        $this->fmslmirZbMax = $fmslmirZbMax;
        return $this;
    }

    /**
     * Get fmslmirZbMax
     *
     * @access public
     * @return float 
     */
    public function getFmslmirZbMax()
    {
        return $this->fmslmirZbMax;
    }

    /**
     * Set fmslmirZbMaxColor
     *
     * @access public
     * @param string $fmslmirZbMaxColor
     * @return Measurement
     */
    public function setFmslmirZbMaxColor($fmslmirZbMaxColor = null)
    {
        $this->fmslmirZbMaxColor = $fmslmirZbMaxColor;
        return $this;
    }

    /**
     * Get fmslmirZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmslmirZbMaxColor()
    {
        return $this->fmslmirZbMaxColor;
    }

    /**
     * Set fmslmirZone
     *
     * @access public
     * @param float $fmslmirZone
     * @return Measurement
     */
    public function setFmslmirZone($fmslmirZone = null)
    {
        $this->fmslmirZone = $fmslmirZone;
        return $this;
    }

    /**
     * Get fmslmirZone
     *
     * @access public
     * @return float 
     */
    public function getFmslmirZone()
    {
        return $this->fmslmirZone;
    }

    /**
     * Set fmirZaMax
     *
     * @access public
     * @param float $fmirZaMax
     * @return Measurement
     */
    public function setFmirZaMax($fmirZaMax = null)
    {
        $this->fmirZaMax = $fmirZaMax;
        return $this;
    }

    /**
     * Get fmirZaMax
     *
     * @access public
     * @return float 
     */
    public function getFmirZaMax()
    {
        return $this->fmirZaMax;
    }

    /**
     * Set fmirZaMaxColor
     *
     * @access public
     * @param string $fmirZaMaxColor
     * @return Measurement
     */
    public function setFmirZaMaxColor($fmirZaMaxColor = null)
    {
        $this->fmirZaMaxColor = $fmirZaMaxColor;
        return $this;
    }

    /**
     * Get fmirZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmirZaMaxColor()
    {
        return $this->fmirZaMaxColor;
    }

    /**
     * Set fmirZbMax
     *
     * @access public
     * @param float $fmirZbMax
     * @return Measurement
     */
    public function setFmirZbMax($fmirZbMax = null)
    {
        $this->fmirZbMax = $fmirZbMax;
        return $this;
    }

    /**
     * Get fmirZbMax
     *
     * @access public
     * @return float 
     */
    public function getFmirZbMax()
    {
        return $this->fmirZbMax;
    }

    /**
     * Set fmirZbMaxColor
     *
     * @access public
     * @param string $fmirZbMaxColor
     * @return Measurement
     */
    public function setFmirZbMaxColor($fmirZbMaxColor = null)
    {
        $this->fmirZbMaxColor = $fmirZbMaxColor;
        return $this;
    }

    /**
     * Get fmirZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getFmirZbMaxColor()
    {
        return $this->fmirZbMaxColor;
    }

    /**
     * Set fmirZone
     *
     * @access public
     * @param float $fmirZone
     * @return Measurement
     */
    public function setFmirZone($fmirZone = null)
    {
        $this->fmirZone = $fmirZone;
        return $this;
    }

    /**
     * Get fmirZone
     *
     * @access public
     * @return float 
     */
    public function getFmirZone()
    {
        return $this->fmirZone;
    }

    /**
     * Set slmirZaMax
     *
     * @access public
     * @param float $slmirZaMax
     * @return Measurement
     */
    public function setSlmirZaMax($slmirZaMax = null)
    {
        $this->slmirZaMax = $slmirZaMax;
        return $this;
    }

    /**
     * Get slmirZaMax
     *
     * @access public
     * @return float 
     */
    public function getSlmirZaMax()
    {
        return $this->slmirZaMax;
    }

    /**
     * Set slmirZaMaxColor
     *
     * @access public
     * @param string $slmirZaMaxColor
     * @return Measurement
     */
    public function setSlmirZaMaxColor($slmirZaMaxColor = null)
    {
        $this->slmirZaMaxColor = $slmirZaMaxColor;
        return $this;
    }

    /**
     * Get slmirZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getSlmirZaMaxColor()
    {
        return $this->slmirZaMaxColor;
    }

    /**
     * Set slmirZbMax
     *
     * @access public
     * @param float $slmirZbMax
     * @return Measurement
     */
    public function setSlmirZbMax($slmirZbMax = null)
    {
        $this->slmirZbMax = $slmirZbMax;
        return $this;
    }

    /**
     * Get slmirZbMax
     *
     * @access public
     * @return float 
     */
    public function getSlmirZbMax()
    {
        return $this->slmirZbMax;
    }

    /**
     * Set slmirZbMaxColor
     *
     * @access public
     * @param string $slmirZbMaxColor
     * @return Measurement
     */
    public function setSlmirZbMaxColor($slmirZbMaxColor = null)
    {
        $this->slmirZbMaxColor = $slmirZbMaxColor;
        return $this;
    }

    /**
     * Get slmirZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getSlmirZbMaxColor()
    {
        return $this->slmirZbMaxColor;
    }

    /**
     * Set slmirZone
     *
     * @access public
     * @param float $slmirZone
     * @return Measurement
     */
    public function setSlmirZone($slmirZone = null)
    {
        $this->slmirZone = $slmirZone;
        return $this;
    }

    /**
     * Get slmirZone
     *
     * @access public
     * @return float 
     */
    public function getSlmirZone()
    {
        return $this->slmirZone;
    }

    /**
     * Set whrZaMax
     *
     * @access public
     * @param float $whrZaMax
     * @return Measurement
     */
    public function setWhrZaMax($whrZaMax = null)
    {
        $this->whrZaMax = $whrZaMax;
        return $this;
    }

    /**
     * Get whrZaMax
     *
     * @access public
     * @return float 
     */
    public function getWhrZaMax()
    {
        return $this->whrZaMax;
    }

    /**
     * Set whrZaMaxColor
     *
     * @access public
     * @param string $whrZaMaxColor
     * @return Measurement
     */
    public function setWhrZaMaxColor($whrZaMaxColor = null)
    {
        $this->whrZaMaxColor = $whrZaMaxColor;
        return $this;
    }

    /**
     * Get whrZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getWhrZaMaxColor()
    {
        return $this->whrZaMaxColor;
    }

    /**
     * Set whrZbMax
     *
     * @access public
     * @param float $whrZbMax
     * @return Measurement
     */
    public function setWhrZbMax($whrZbMax = null)
    {
        $this->whrZbMax = $whrZbMax;
        return $this;
    }

    /**
     * Get whrZbMax
     *
     * @access public
     * @return float 
     */
    public function getWhrZbMax()
    {
        return $this->whrZbMax;
    }

    /**
     * Set whrZbMaxColor
     *
     * @access public
     * @param string $whrZbMaxColor
     * @return Measurement
     */
    public function setWhrZbMaxColor($whrZbMaxColor = null)
    {
        $this->whrZbMaxColor = $whrZbMaxColor;
        return $this;
    }

    /**
     * Get whrZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getWhrZbMaxColor()
    {
        return $this->whrZbMaxColor;
    }

    /**
     * Set whrZone
     *
     * @access public
     * @param float $whrZone
     * @return Measurement
     */
    public function setWhrZone($whrZone = null)
    {
        $this->whrZone = $whrZone;
        return $this;
    }

    /**
     * Get whrZone
     *
     * @access public
     * @return float 
     */
    public function getWhrZone()
    {
        return $this->whrZone;
    }

    /**
     * Set whtrZaMax
     *
     * @access public
     * @param float $whtrZaMax
     * @return Measurement
     */
    public function setWhtrZaMax($whtrZaMax = null)
    {
        $this->whtrZaMax = $whtrZaMax;
        return $this;
    }

    /**
     * Get whtrZaMax
     *
     * @access public
     * @return float 
     */
    public function getWhtrZaMax()
    {
        return $this->whtrZaMax;
    }

    /**
     * Set whtrZaMaxColor
     *
     * @access public
     * @param string $whtrZaMaxColor
     * @return Measurement
     */
    public function setWhtrZaMaxColor($whtrZaMaxColor = null)
    {
        $this->whtrZaMaxColor = $whtrZaMaxColor;
        return $this;
    }

    /**
     * Get whtrZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getWhtrZaMaxColor()
    {
        return $this->whtrZaMaxColor;
    }

    /**
     * Set whtrZbMax
     *
     * @access public
     * @param float $whtrZbMax
     * @return Measurement
     */
    public function setWhtrZbMax($whtrZbMax = null)
    {
        $this->whtrZbMax = $whtrZbMax;
        return $this;
    }

    /**
     * Get whtrZbMax
     *
     * @access public
     * @return float 
     */
    public function getWhtrZbMax()
    {
        return $this->whtrZbMax;
    }

    /**
     * Set whtrZbMaxColor
     *
     * @access public
     * @param string $whtrZbMaxColor
     * @return Measurement
     */
    public function setWhtrZbMaxColor($whtrZbMaxColor = null)
    {
        $this->whtrZbMaxColor = $whtrZbMaxColor;
        return $this;
    }

    /**
     * Get whtrZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getWhtrZbMaxColor()
    {
        return $this->whtrZbMaxColor;
    }

    /**
     * Set whtrZone
     *
     * @access public
     * @param float $whtrZone
     * @return Measurement
     */
    public function setWhtrZone($whtrZone = null)
    {
        $this->whtrZone = $whtrZone;
        return $this;
    }

    /**
     * Get whtrZone
     *
     * @access public
     * @return float 
     */
    public function getWhtrZone()
    {
        return $this->whtrZone;
    }

    /**
     * Set totalCcScZaMax
     *
     * @access public
     * @param float $totalCcScZaMax
     * @return Measurement
     */
    public function setTotalCcScZaMax($totalCcScZaMax = null)
    {
        $this->totalCcScZaMax = $totalCcScZaMax;
        return $this;
    }

    /**
     * Get totalCcScZaMax
     *
     * @access public
     * @return float 
     */
    public function getTotalCcScZaMax()
    {
        return $this->totalCcScZaMax;
    }

    /**
     * Set totalCcScZaMaxColor
     *
     * @access public
     * @param string $totalCcScZaMaxColor
     * @return Measurement
     */
    public function setTotalCcScZaMaxColor($totalCcScZaMaxColor = null)
    {
        $this->totalCcScZaMaxColor = $totalCcScZaMaxColor;
        return $this;
    }

    /**
     * Get totalCcScZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalCcScZaMaxColor()
    {
        return $this->totalCcScZaMaxColor;
    }

    /**
     * Set totalCcScZbMax
     *
     * @access public
     * @param float $totalCcScZbMax
     * @return Measurement
     */
    public function setTotalCcScZbMax($totalCcScZbMax = null)
    {
        $this->totalCcScZbMax = $totalCcScZbMax;
        return $this;
    }

    /**
     * Get totalCcScZbMax
     *
     * @access public
     * @return float 
     */
    public function getTotalCcScZbMax()
    {
        return $this->totalCcScZbMax;
    }

    /**
     * Set totalCcScZbMaxColor
     *
     * @access public
     * @param string $totalCcScZbMaxColor
     * @return Measurement
     */
    public function setTotalCcScZbMaxColor($totalCcScZbMaxColor = null)
    {
        $this->totalCcScZbMaxColor = $totalCcScZbMaxColor;
        return $this;
    }

    /**
     * Get totalCcScZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalCcScZbMaxColor()
    {
        return $this->totalCcScZbMaxColor;
    }

    /**
     * Set totalCcScZcMax
     *
     * @access public
     * @param float $totalCcScZcMax
     * @return Measurement
     */
    public function setTotalCcScZcMax($totalCcScZcMax = null)
    {
        $this->totalCcScZcMax = $totalCcScZcMax;
        return $this;
    }

    /**
     * Get totalCcScZcMax
     *
     * @access public
     * @return float 
     */
    public function getTotalCcScZcMax()
    {
        return $this->totalCcScZcMax;
    }

    /**
     * Set totalCcScZcMaxColor
     *
     * @access public
     * @param string $totalCcScZcMaxColor
     * @return Measurement
     */
    public function setTotalCcScZcMaxColor($totalCcScZcMaxColor = null)
    {
        $this->totalCcScZcMaxColor = $totalCcScZcMaxColor;
        return $this;
    }

    /**
     * Get totalCcScZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalCcScZcMaxColor()
    {
        return $this->totalCcScZcMaxColor;
    }

    /**
     * Set totalCcScZone
     *
     * @access public
     * @param float $totalCcScZone
     * @return Measurement
     */
    public function setTotalCcScZone($totalCcScZone = null)
    {
        $this->totalCcScZone = $totalCcScZone;
        return $this;
    }

    /**
     * Get totalCcScZone
     *
     * @access public
     * @return float 
     */
    public function getTotalCcScZone()
    {
        return $this->totalCcScZone;
    }

    /**
     * Set totalMuhScZaMax
     *
     * @access public
     * @param float $totalMuhScZaMax
     * @return Measurement
     */
    public function setTotalMuhScZaMax($totalMuhScZaMax = null)
    {
        $this->totalMuhScZaMax = $totalMuhScZaMax;
        return $this;
    }

    /**
     * Get totalMuhScZaMax
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhScZaMax()
    {
        return $this->totalMuhScZaMax;
    }

    /**
     * Set totalMuhScZaMaxColor
     *
     * @access public
     * @param string $totalMuhScZaMaxColor
     * @return Measurement
     */
    public function setTotalMuhScZaMaxColor($totalMuhScZaMaxColor = null)
    {
        $this->totalMuhScZaMaxColor = $totalMuhScZaMaxColor;
        return $this;
    }

    /**
     * Get totalMuhScZaMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalMuhScZaMaxColor()
    {
        return $this->totalMuhScZaMaxColor;
    }

    /**
     * Set totalMuhScZbMax
     *
     * @access public
     * @param float $totalMuhScZbMax
     * @return Measurement
     */
    public function setTotalMuhScZbMax($totalMuhScZbMax = null)
    {
        $this->totalMuhScZbMax = $totalMuhScZbMax;
        return $this;
    }

    /**
     * Get totalMuhScZbMax
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhScZbMax()
    {
        return $this->totalMuhScZbMax;
    }

    /**
     * Set totalMuhScZbMaxColor
     *
     * @access public
     * @param string $totalMuhScZbMaxColor
     * @return Measurement
     */
    public function setTotalMuhScZbMaxColor($totalMuhScZbMaxColor = null)
    {
        $this->totalMuhScZbMaxColor = $totalMuhScZbMaxColor;
        return $this;
    }

    /**
     * Get totalMuhScZbMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalMuhScZbMaxColor()
    {
        return $this->totalMuhScZbMaxColor;
    }

    /**
     * Set totalMuhScZcMax
     *
     * @access public
     * @param float $totalMuhScZcMax
     * @return Measurement
     */
    public function setTotalMuhScZcMax($totalMuhScZcMax = null)
    {
        $this->totalMuhScZcMax = $totalMuhScZcMax;
        return $this;
    }

    /**
     * Get totalMuhScZcMax
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhScZcMax()
    {
        return $this->totalMuhScZcMax;
    }

    /**
     * Set totalMuhScZcMaxColor
     *
     * @access public
     * @param string $totalMuhScZcMaxColor
     * @return Measurement
     */
    public function setTotalMuhScZcMaxColor($totalMuhScZcMaxColor = null)
    {
        $this->totalMuhScZcMaxColor = $totalMuhScZcMaxColor;
        return $this;
    }

    /**
     * Get totalMuhScZcMaxColor
     *
     * @access public
     * @return string 
     */
    public function getTotalMuhScZcMaxColor()
    {
        return $this->totalMuhScZcMaxColor;
    }

    /**
     * Set totalMuhScZone
     *
     * @access public
     * @param float $totalMuhScZone
     * @return Measurement
     */
    public function setTotalMuhScZone($totalMuhScZone = null)
    {
        $this->totalMuhScZone = $totalMuhScZone;
        return $this;
    }

    /**
     * Get totalMuhScZone
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhScZone()
    {
        return $this->totalMuhScZone;
    }

    /**
     * Set cibleZaColor
     *
     * @access public
     * @param string $cibleZaColor
     * @return Measurement
     */
    public function setCibleZaColor($cibleZaColor = null)
    {
        $this->cibleZaColor = $cibleZaColor;
        return $this;
    }

    /**
     * Get cibleZaColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZaColor()
    {
        return $this->cibleZaColor;
    }

    /**
     * Set cibleZbColor
     *
     * @access public
     * @param string $cibleZbColor
     * @return Measurement
     */
    public function setCibleZbColor($cibleZbColor = null)
    {
        $this->cibleZbColor = $cibleZbColor;
        return $this;
    }

    /**
     * Get cibleZbColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZbColor()
    {
        return $this->cibleZbColor;
    }

    /**
     * Set cibleZcColor
     *
     * @access public
     * @param string $cibleZcColor
     * @return Measurement
     */
    public function setCibleZcColor($cibleZcColor = null)
    {
        $this->cibleZcColor = $cibleZcColor;
        return $this;
    }

    /**
     * Get cibleZcColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZcColor()
    {
        return $this->cibleZcColor;
    }

    /**
     * Set cibleZdColor
     *
     * @access public
     * @param string $cibleZdColor
     * @return Measurement
     */
    public function setCibleZdColor($cibleZdColor = null)
    {
        $this->cibleZdColor = $cibleZdColor;
        return $this;
    }

    /**
     * Get cibleZdColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZdColor()
    {
        return $this->cibleZdColor;
    }

    /**
     * Set cibleZeColor
     *
     * @access public
     * @param string $cibleZeColor
     * @return Measurement
     */
    public function setCibleZeColor($cibleZeColor = null)
    {
        $this->cibleZeColor = $cibleZeColor;
        return $this;
    }

    /**
     * Get cibleZeColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZeColor()
    {
        return $this->cibleZeColor;
    }

    /**
     * Set cibleZfColor
     *
     * @access public
     * @param string $cibleZfColor
     * @return Measurement
     */
    public function setCibleZfColor($cibleZfColor = null)
    {
        $this->cibleZfColor = $cibleZfColor;
        return $this;
    }

    /**
     * Get cibleZfColor
     *
     * @access public
     * @return string 
     */
    public function getCibleZfColor()
    {
        return $this->cibleZfColor;
    }

    /**
     * Set cibleZone
     *
     * @access public
     * @param float $cibleZone
     * @return Measurement
     */
    public function setCibleZone($cibleZone = null)
    {
        $this->cibleZone = $cibleZone;
        return $this;
    }

    /**
     * Get cibleZone
     *
     * @access public
     * @return float 
     */
    public function getCibleZone()
    {
        return $this->cibleZone;
    }

    /**
     * Set ciblePoint
     *
     * @access public
     * @param float $ciblePoint
     * @return Measurement
     */
    public function setCiblePoint($ciblePoint = null)
    {
        $this->ciblePoint = $ciblePoint;
        return $this;
    }

    /**
     * Get ciblePoint
     *
     * @access public
     * @return float 
     */
    public function getCiblePoint()
    {
        return $this->ciblePoint;
    }

    /**
     * Set cibleIcwPcStdB
     *
     * @access public
     * @param float $cibleIcwPcStdB
     * @return Measurement
     */
    public function setCibleIcwPcStdB($cibleIcwPcStdB = null)
    {
        $this->cibleIcwPcStdB = $cibleIcwPcStdB;
        return $this;
    }

    /**
     * Get cibleIcwPcStdB
     *
     * @access public
     * @return float 
     */
    public function getCibleIcwPcStdB()
    {
        return $this->cibleIcwPcStdB;
    }

    /**
     * Set cibleIcwPcStdC
     *
     * @access public
     * @param float $cibleIcwPcStdC
     * @return Measurement
     */
    public function setCibleIcwPcStdC($cibleIcwPcStdC = null)
    {
        $this->cibleIcwPcStdC = $cibleIcwPcStdC;
        return $this;
    }

    /**
     * Get cibleIcwPcStdC
     *
     * @access public
     * @return float 
     */
    public function getCibleIcwPcStdC()
    {
        return $this->cibleIcwPcStdC;
    }

    /**
     * Set cibleIcwPcStdD
     *
     * @access public
     * @param float $cibleIcwPcStdD
     * @return Measurement
     */
    public function setCibleIcwPcStdD($cibleIcwPcStdD = null)
    {
        $this->cibleIcwPcStdD = $cibleIcwPcStdD;
        return $this;
    }

    /**
     * Get cibleIcwPcStdD
     *
     * @access public
     * @return float 
     */
    public function getCibleIcwPcStdD()
    {
        return $this->cibleIcwPcStdD;
    }

    /**
     * Set cibleIcwPcStdE
     *
     * @access public
     * @param float $cibleIcwPcStdE
     * @return Measurement
     */
    public function setCibleIcwPcStdE($cibleIcwPcStdE = null)
    {
        $this->cibleIcwPcStdE = $cibleIcwPcStdE;
        return $this;
    }

    /**
     * Get cibleIcwPcStdE
     *
     * @access public
     * @return float 
     */
    public function getCibleIcwPcStdE()
    {
        return $this->cibleIcwPcStdE;
    }

    /**
     * Set cibleFmHcPcStdA
     *
     * @access public
     * @param float $cibleFmHcPcStdA
     * @return Measurement
     */
    public function setCibleFmHcPcStdA($cibleFmHcPcStdA = null)
    {
        $this->cibleFmHcPcStdA = $cibleFmHcPcStdA;
        return $this;
    }

    /**
     * Get cibleFmHcPcStdA
     *
     * @access public
     * @return float 
     */
    public function getCibleFmHcPcStdA()
    {
        return $this->cibleFmHcPcStdA;
    }

    /**
     * Set cibleFmHcPcStdB
     *
     * @access public
     * @param float $cibleFmHcPcStdB
     * @return Measurement
     */
    public function setCibleFmHcPcStdB($cibleFmHcPcStdB = null)
    {
        $this->cibleFmHcPcStdB = $cibleFmHcPcStdB;
        return $this;
    }

    /**
     * Get cibleFmHcPcStdB
     *
     * @access public
     * @return float 
     */
    public function getCibleFmHcPcStdB()
    {
        return $this->cibleFmHcPcStdB;
    }

    /**
     * Set cibleFmHcPcStdC
     *
     * @access public
     * @param float $cibleFmHcPcStdC
     * @return Measurement
     */
    public function setCibleFmHcPcStdC($cibleFmHcPcStdC = null)
    {
        $this->cibleFmHcPcStdC = $cibleFmHcPcStdC;
        return $this;
    }

    /**
     * Get cibleFmHcPcStdC
     *
     * @access public
     * @return float 
     */
    public function getCibleFmHcPcStdC()
    {
        return $this->cibleFmHcPcStdC;
    }

    /**
     * Set cibleFmHcPcStdE
     *
     * @access public
     * @param float $cibleFmHcPcStdE
     * @return Measurement
     */
    public function setCibleFmHcPcStdE($cibleFmHcPcStdE = null)
    {
        $this->cibleFmHcPcStdE = $cibleFmHcPcStdE;
        return $this;
    }

    /**
     * Get cibleFmHcPcStdE
     *
     * @access public
     * @return float 
     */
    public function getCibleFmHcPcStdE()
    {
        return $this->cibleFmHcPcStdE;
    }

    /**
     * Set cibleFfwStdA
     *
     * @access public
     * @param float $cibleFfwStdA
     * @return Measurement
     */
    public function setCibleFfwStdA($cibleFfwStdA = null)
    {
        $this->cibleFfwStdA = $cibleFfwStdA;
        return $this;
    }

    /**
     * Get cibleFfwStdA
     *
     * @access public
     * @return float 
     */
    public function getCibleFfwStdA()
    {
        return $this->cibleFfwStdA;
    }

    /**
     * Set cibleFfwStdB
     *
     * @access public
     * @param float $cibleFfwStdB
     * @return Measurement
     */
    public function setCibleFfwStdB($cibleFfwStdB = null)
    {
        $this->cibleFfwStdB = $cibleFfwStdB;
        return $this;
    }

    /**
     * Get cibleFfwStdB
     *
     * @access public
     * @return float 
     */
    public function getCibleFfwStdB()
    {
        return $this->cibleFfwStdB;
    }

    /**
     * Set cibleFfwStdC
     *
     * @access public
     * @param float $cibleFfwStdC
     * @return Measurement
     */
    public function setCibleFfwStdC($cibleFfwStdC = null)
    {
        $this->cibleFfwStdC = $cibleFfwStdC;
        return $this;
    }

    /**
     * Get cibleFfwStdC
     *
     * @access public
     * @return float 
     */
    public function getCibleFfwStdC()
    {
        return $this->cibleFfwStdC;
    }

    /**
     * Set cibleFfwStdD
     *
     * @access public
     * @param float $cibleFfwStdD
     * @return Measurement
     */
    public function setCibleFfwStdD($cibleFfwStdD = null)
    {
        $this->cibleFfwStdD = $cibleFfwStdD;
        return $this;
    }

    /**
     * Get cibleFfwStdD
     *
     * @access public
     * @return float 
     */
    public function getCibleFfwStdD()
    {
        return $this->cibleFfwStdD;
    }

    /**
     * Set fmHcPcPos
     *
     * @access public
     * @param float $fmHcPcPos
     * @return Measurement
     */
    public function setFmHcPcPos($fmHcPcPos = null)
    {
        $this->fmHcPcPos = $fmHcPcPos;
        return $this;
    }

    /**
     * Get fmHcPcPos
     *
     * @access public
     * @return float 
     */
    public function getFmHcPcPos()
    {
        return $this->fmHcPcPos;
    }

    /**
     * Set ffwPcPos
     *
     * @access public
     * @param float $ffwPcPos
     * @return Measurement
     */
    public function setFfwPcPos($ffwPcPos = null)
    {
        $this->ffwPcPos = $ffwPcPos;
        return $this;
    }

    /**
     * Get ffwPcPos
     *
     * @access public
     * @return float 
     */
    public function getFfwPcPos()
    {
        return $this->ffwPcPos;
    }

    /**
     * Set mmhiPos
     *
     * @access public
     * @param float $mmhiPos
     * @return Measurement
     */
    public function setMmhiPos($mmhiPos = null)
    {
        $this->mmhiPos = $mmhiPos;
        return $this;
    }

    /**
     * Get mmhiPos
     *
     * @access public
     * @return float 
     */
    public function getMmhiPos()
    {
        return $this->mmhiPos;
    }

    /**
     * Set adcrPos
     *
     * @access public
     * @param float $adcrPos
     * @return Measurement
     */
    public function setAdcrPos($adcrPos = null)
    {
        $this->adcrPos = $adcrPos;
        return $this;
    }

    /**
     * Get adcrPos
     *
     * @access public
     * @return float 
     */
    public function getAdcrPos()
    {
        return $this->adcrPos;
    }

    /**
     * Set adcrConsInf
     *
     * @access public
     * @param float $adcrConsInf
     * @return Measurement
     */
    public function setAdcrConsInf($adcrConsInf = null)
    {
        $this->adcrConsInf = $adcrConsInf;
        return $this;
    }

    /**
     * Get adcrConsInf
     *
     * @access public
     * @return float 
     */
    public function getAdcrConsInf()
    {
        return $this->adcrConsInf;
    }

    /**
     * Set adcrConsSup
     *
     * @access public
     * @param float $adcrConsSup
     * @return Measurement
     */
    public function setAdcrConsSup($adcrConsSup = null)
    {
        $this->adcrConsSup = $adcrConsSup;
        return $this;
    }

    /**
     * Get adcrConsSup
     *
     * @access public
     * @return float 
     */
    public function getAdcrConsSup()
    {
        return $this->adcrConsSup;
    }

    /**
     * Set asmmiPos
     *
     * @access public
     * @param float $asmmiPos
     * @return Measurement
     */
    public function setAsmmiPos($asmmiPos = null)
    {
        $this->asmmiPos = $asmmiPos;
        return $this;
    }

    /**
     * Get asmmiPos
     *
     * @access public
     * @return float 
     */
    public function getAsmmiPos()
    {
        return $this->asmmiPos;
    }

    /**
     * Set ecwPcPos
     *
     * @access public
     * @param float $ecwPcPos
     * @return Measurement
     */
    public function setEcwPcPos($ecwPcPos = null)
    {
        $this->ecwPcPos = $ecwPcPos;
        return $this;
    }

    /**
     * Get ecwPcPos
     *
     * @access public
     * @return float 
     */
    public function getEcwPcPos()
    {
        return $this->ecwPcPos;
    }

    /**
     * Set icwPcPos
     *
     * @access public
     * @param float $icwPcPos
     * @return Measurement
     */
    public function setIcwPcPos($icwPcPos = null)
    {
        $this->icwPcPos = $icwPcPos;
        return $this;
    }

    /**
     * Get icwPcPos
     *
     * @access public
     * @return float 
     */
    public function getIcwPcPos()
    {
        return $this->icwPcPos;
    }

    /**
     * Set fmPcPos
     *
     * @access public
     * @param float $fmPcPos
     * @return Measurement
     */
    public function setFmPcPos($fmPcPos = null)
    {
        $this->fmPcPos = $fmPcPos;
        return $this;
    }

    /**
     * Get fmPcPos
     *
     * @access public
     * @return float 
     */
    public function getFmPcPos()
    {
        return $this->fmPcPos;
    }

    /**
     * Set tbwffmPcPos
     *
     * @access public
     * @param float $tbwffmPcPos
     * @return Measurement
     */
    public function setTbwffmPcPos($tbwffmPcPos = null)
    {
        $this->tbwffmPcPos = $tbwffmPcPos;
        return $this;
    }

    /**
     * Get tbwffmPcPos
     *
     * @access public
     * @return float 
     */
    public function getTbwffmPcPos()
    {
        return $this->tbwffmPcPos;
    }

    /**
     * Set dffmiPos
     *
     * @access public
     * @param float $dffmiPos
     * @return Measurement
     */
    public function setDffmiPos($dffmiPos = null)
    {
        $this->dffmiPos = $dffmiPos;
        return $this;
    }

    /**
     * Get dffmiPos
     *
     * @access public
     * @return float 
     */
    public function getDffmiPos()
    {
        return $this->dffmiPos;
    }

    /**
     * Set mpMetaiPos
     *
     * @access public
     * @param float $mpMetaiPos
     * @return Measurement
     */
    public function setMpMetaiPos($mpMetaiPos = null)
    {
        $this->mpMetaiPos = $mpMetaiPos;
        return $this;
    }

    /**
     * Get mpMetaiPos
     *
     * @access public
     * @return float 
     */
    public function getMpMetaiPos()
    {
        return $this->mpMetaiPos;
    }

    /**
     * Set iffmiPos
     *
     * @access public
     * @param float $iffmiPos
     * @return Measurement
     */
    public function setIffmiPos($iffmiPos = null)
    {
        $this->iffmiPos = $iffmiPos;
        return $this;
    }

    /**
     * Get iffmiPos
     *
     * @access public
     * @return float 
     */
    public function getIffmiPos()
    {
        return $this->iffmiPos;
    }

    /**
     * Set bmriPos
     *
     * @access public
     * @param float $bmriPos
     * @return Measurement
     */
    public function setBmriPos($bmriPos = null)
    {
        $this->bmriPos = $bmriPos;
        return $this;
    }

    /**
     * Get bmriPos
     *
     * @access public
     * @return float 
     */
    public function getBmriPos()
    {
        return $this->bmriPos;
    }

    /**
     * Set ffecwPcPos
     *
     * @access public
     * @param float $ffecwPcPos
     * @return Measurement
     */
    public function setFfecwPcPos($ffecwPcPos = null)
    {
        $this->ffecwPcPos = $ffecwPcPos;
        return $this;
    }

    /**
     * Get ffecwPcPos
     *
     * @access public
     * @return float 
     */
    public function getFfecwPcPos()
    {
        return $this->ffecwPcPos;
    }

    /**
     * Set ffecwiPos
     *
     * @access public
     * @param float $ffecwiPos
     * @return Measurement
     */
    public function setFfecwiPos($ffecwiPos = null)
    {
        $this->ffecwiPos = $ffecwiPos;
        return $this;
    }

    /**
     * Get ffecwiPos
     *
     * @access public
     * @return float 
     */
    public function getFfecwiPos()
    {
        return $this->ffecwiPos;
    }

    /**
     * Set fficwPcPos
     *
     * @access public
     * @param float $fficwPcPos
     * @return Measurement
     */
    public function setFficwPcPos($fficwPcPos = null)
    {
        $this->fficwPcPos = $fficwPcPos;
        return $this;
    }

    /**
     * Get fficwPcPos
     *
     * @access public
     * @return float 
     */
    public function getFficwPcPos()
    {
        return $this->fficwPcPos;
    }

    /**
     * Set fficwiPos
     *
     * @access public
     * @param float $fficwiPos
     * @return Measurement
     */
    public function setFficwiPos($fficwiPos = null)
    {
        $this->fficwiPos = $fficwiPos;
        return $this;
    }

    /**
     * Get fficwiPos
     *
     * @access public
     * @return float 
     */
    public function getFficwiPos()
    {
        return $this->fficwiPos;
    }

    /**
     * Set asmhiPos
     *
     * @access public
     * @param float $asmhiPos
     * @return Measurement
     */
    public function setAsmhiPos($asmhiPos = null)
    {
        $this->asmhiPos = $asmhiPos;
        return $this;
    }

    /**
     * Get asmhiPos
     *
     * @access public
     * @return float 
     */
    public function getAsmhiPos()
    {
        return $this->asmhiPos;
    }

    /**
     * Set bcmiPos
     *
     * @access public
     * @param float $bcmiPos
     * @return Measurement
     */
    public function setBcmiPos($bcmiPos = null)
    {
        $this->bcmiPos = $bcmiPos;
        return $this;
    }

    /**
     * Get bcmiPos
     *
     * @access public
     * @return float 
     */
    public function getBcmiPos()
    {
        return $this->bcmiPos;
    }

    /**
     * Set imcPos
     *
     * @access public
     * @param float $imcPos
     * @return Measurement
     */
    public function setImcPos($imcPos = null)
    {
        $this->imcPos = $imcPos;
        return $this;
    }

    /**
     * Get imcPos
     *
     * @access public
     * @return float 
     */
    public function getImcPos()
    {
        return $this->imcPos;
    }

    /**
     * Set fmslmirCcSc
     *
     * @access public
     * @param float $fmslmirCcSc
     * @return Measurement
     */
    public function setFmslmirCcSc($fmslmirCcSc = null)
    {
        $this->fmslmirCcSc = $fmslmirCcSc;
        return $this;
    }

    /**
     * Get fmslmirCcSc
     *
     * @access public
     * @return float 
     */
    public function getFmslmirCcSc()
    {
        return $this->fmslmirCcSc;
    }

    /**
     * Set fmirCcSc
     *
     * @access public
     * @param float $fmirCcSc
     * @return Measurement
     */
    public function setFmirCcSc($fmirCcSc = null)
    {
        $this->fmirCcSc = $fmirCcSc;
        return $this;
    }

    /**
     * Get fmirCcSc
     *
     * @access public
     * @return float 
     */
    public function getFmirCcSc()
    {
        return $this->fmirCcSc;
    }

    /**
     * Set slmirCcSc
     *
     * @access public
     * @param float $slmirCcSc
     * @return Measurement
     */
    public function setSlmirCcSc($slmirCcSc = null)
    {
        $this->slmirCcSc = $slmirCcSc;
        return $this;
    }

    /**
     * Get slmirCcSc
     *
     * @access public
     * @return float 
     */
    public function getSlmirCcSc()
    {
        return $this->slmirCcSc;
    }

    /**
     * Set whrCcSc
     *
     * @access public
     * @param float $whrCcSc
     * @return Measurement
     */
    public function setWhrCcSc($whrCcSc = null)
    {
        $this->whrCcSc = $whrCcSc;
        return $this;
    }

    /**
     * Get whrCcSc
     *
     * @access public
     * @return float 
     */
    public function getWhrCcSc()
    {
        return $this->whrCcSc;
    }

    /**
     * Set whtrCcSc
     *
     * @access public
     * @param float $whtrCcSc
     * @return Measurement
     */
    public function setWhtrCcSc($whtrCcSc = null)
    {
        $this->whtrCcSc = $whtrCcSc;
        return $this;
    }

    /**
     * Get whtrCcSc
     *
     * @access public
     * @return float 
     */
    public function getWhtrCcSc()
    {
        return $this->whtrCcSc;
    }

    /**
     * Set totalCcSc
     *
     * @access public
     * @param float $totalCcSc
     * @return Measurement
     */
    public function setTotalCcSc($totalCcSc = null)
    {
        $this->totalCcSc = $totalCcSc;
        return $this;
    }

    /**
     * Get totalCcSc
     *
     * @access public
     * @return float 
     */
    public function getTotalCcSc()
    {
        return $this->totalCcSc;
    }

    /**
     * Set totalCcScPos
     *
     * @access public
     * @param float $totalCcScPos
     * @return Measurement
     */
    public function setTotalCcScPos($totalCcScPos = null)
    {
        $this->totalCcScPos = $totalCcScPos;
        return $this;
    }

    /**
     * Get totalCcScPos
     *
     * @access public
     * @return float 
     */
    public function getTotalCcScPos()
    {
        return $this->totalCcScPos;
    }

    /**
     * Set fmslmirMuhSc
     *
     * @access public
     * @param float $fmslmirMuhSc
     * @return Measurement
     */
    public function setFmslmirMuhSc($fmslmirMuhSc = null)
    {
        $this->fmslmirMuhSc = $fmslmirMuhSc;
        return $this;
    }

    /**
     * Get fmslmirMuhSc
     *
     * @access public
     * @return float 
     */
    public function getFmslmirMuhSc()
    {
        return $this->fmslmirMuhSc;
    }

    /**
     * Set fmirMuhSc
     *
     * @access public
     * @param float $fmirMuhSc
     * @return Measurement
     */
    public function setFmirMuhSc($fmirMuhSc = null)
    {
        $this->fmirMuhSc = $fmirMuhSc;
        return $this;
    }

    /**
     * Get fmirMuhSc
     *
     * @access public
     * @return float 
     */
    public function getFmirMuhSc()
    {
        return $this->fmirMuhSc;
    }

    /**
     * Set slmirMuhSc
     *
     * @access public
     * @param float $slmirMuhSc
     * @return Measurement
     */
    public function setSlmirMuhSc($slmirMuhSc = null)
    {
        $this->slmirMuhSc = $slmirMuhSc;
        return $this;
    }

    /**
     * Get slmirMuhSc
     *
     * @access public
     * @return float 
     */
    public function getSlmirMuhSc()
    {
        return $this->slmirMuhSc;
    }

    /**
     * Set totalMuhSc
     *
     * @access public
     * @param float $totalMuhSc
     * @return Measurement
     */
    public function setTotalMuhSc($totalMuhSc = null)
    {
        $this->totalMuhSc = $totalMuhSc;
        return $this;
    }

    /**
     * Get totalMuhSc
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhSc()
    {
        return $this->totalMuhSc;
    }

    /**
     * Set totalMuhScPos
     *
     * @access public
     * @param float $totalMuhScPos
     * @return Measurement
     */
    public function setTotalMuhScPos($totalMuhScPos = null)
    {
        $this->totalMuhScPos = $totalMuhScPos;
        return $this;
    }

    /**
     * Get totalMuhScPos
     *
     * @access public
     * @return float 
     */
    public function getTotalMuhScPos()
    {
        return $this->totalMuhScPos;
    }

    /**
     * Set cibleIcwPcPos
     *
     * @access public
     * @param float $cibleIcwPcPos
     * @return Measurement
     */
    public function setCibleIcwPcPos($cibleIcwPcPos = null)
    {
        $this->cibleIcwPcPos = $cibleIcwPcPos;
        return $this;
    }

    /**
     * Get cibleIcwPcPos
     *
     * @access public
     * @return float 
     */
    public function getCibleIcwPcPos()
    {
        return $this->cibleIcwPcPos;
    }

    /**
     * Set cibleImcPos
     *
     * @access public
     * @param float $cibleImcPos
     * @return Measurement
     */
    public function setCibleImcPos($cibleImcPos = null)
    {
        $this->cibleImcPos = $cibleImcPos;
        return $this;
    }

    /**
     * Get cibleImcPos
     *
     * @access public
     * @return float 
     */
    public function getCibleImcPos()
    {
        return $this->cibleImcPos;
    }

    /**
     * Set cibleFmHcPcPos
     *
     * @access public
     * @param float $cibleFmHcPcPos
     * @return Measurement
     */
    public function setCibleFmHcPcPos($cibleFmHcPcPos = null)
    {
        $this->cibleFmHcPcPos = $cibleFmHcPcPos;
        return $this;
    }

    /**
     * Get cibleFmHcPcPos
     *
     * @access public
     * @return float 
     */
    public function getCibleFmHcPcPos()
    {
        return $this->cibleFmHcPcPos;
    }

    /**
     * Set cibleMmhiPos
     *
     * @access public
     * @param float $cibleMmhiPos
     * @return Measurement
     */
    public function setCibleMmhiPos($cibleMmhiPos = null)
    {
        $this->cibleMmhiPos = $cibleMmhiPos;
        return $this;
    }

    /**
     * Get cibleMmhiPos
     *
     * @access public
     * @return float 
     */
    public function getCibleMmhiPos()
    {
        return $this->cibleMmhiPos;
    }

    /**
     * Set cibleAsmhiPos
     *
     * @access public
     * @param float $cibleAsmhiPos
     * @return Measurement
     */
    public function setCibleAsmhiPos($cibleAsmhiPos = null)
    {
        $this->cibleAsmhiPos = $cibleAsmhiPos;
        return $this;
    }

    /**
     * Get cibleAsmhiPos
     *
     * @access public
     * @return float 
     */
    public function getCibleAsmhiPos()
    {
        return $this->cibleAsmhiPos;
    }

    /**
     * Set cibleFfwPos
     *
     * @access public
     * @param float $cibleFfwPos
     * @return Measurement
     */
    public function setCibleFfwPos($cibleFfwPos = null)
    {
        $this->cibleFfwPos = $cibleFfwPos;
        return $this;
    }

    /**
     * Get cibleFfwPos
     *
     * @access public
     * @return float 
     */
    public function getCibleFfwPos()
    {
        return $this->cibleFfwPos;
    }

    /**
     * Set asmliColor
     *
     * @access public
     * @param string $asmliColor
     * @return Measurement
     */
    public function setAsmliColor($asmliColor = null)
    {
        $this->asmliColor = $asmliColor;
        return $this;
    }

    /**
     * Get asmliColor
     *
     * @access public
     * @return string 
     */
    public function getAsmliColor()
    {
        return $this->asmliColor;
    }

    /**
     * Set asmtliColor
     *
     * @access public
     * @param string $asmtliColor
     * @return Measurement
     */
    public function setAsmtliColor($asmtliColor = null)
    {
        $this->asmtliColor = $asmtliColor;
        return $this;
    }

    /**
     * Get asmtliColor
     *
     * @access public
     * @return string 
     */
    public function getAsmtliColor()
    {
        return $this->asmtliColor;
    }

    /**
     * Set request
     *
     * @access public
     * @param string $request
     * @return Measurement
     */
    public function setRequest($request = null)
    {
        $this->request = $request;
        return $this;
    }

    /**
     * Get request
     *
     * @access public
     * @return string 
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * Set response
     *
     * @access public
     * @param string $response
     * @return Measurement
     */
    public function setResponse($response = null)
    {
        $this->response = $response;
        return $this;
    }

    /**
     * Get response
     *
     * @access public
     * @return string 
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * Set interpretationDate
     *
     * @access public
     * @param \DateTime $interpretationDate
     * @return Measurement
     */
    public function setInterpretationDate(\DateTime $interpretationDate = null)
    {
        $this->interpretationDate = $interpretationDate;
        return $this;
    }

    /**
     * Get interpretationDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getInterpretationDate()
    {
        return $this->interpretationDate;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Measurement
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * Get createdAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set modifiedAt
     *
     * @access public
     * @param \DateTime $modifiedAt
     * @return Measurement
     */
    public function setModifiedAt(\DateTime $modifiedAt = null)
    {
        $this->modifiedAt = $modifiedAt;
        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getModifiedAt()
    {
        return $this->modifiedAt;
    }

    /**
     * Set thighsSize
     *
     * @access public
     * @param float $thighsSize
     * @return Measurement
     */
    public function setThighsSize($thighsSize = null)
    {
        $this->thighsSize = $thighsSize;
        return $this;
    }

    /**
     * Get thighsSize
     *
     * @access public
     * @return float 
     */
    public function getThighsSize()
    {
        return $this->thighsSize;
    }

    /**
     * Set hipsSize
     *
     * @access public
     * @param float $hipsSize
     * @return Measurement
     */
    public function setHipsSize($hipsSize = null)
    {
        $this->hipsSize = $hipsSize;
        return $this;
    }

    /**
     * Get hipsSize
     *
     * @access public
     * @return float 
     */
    public function getHipsSize()
    {
        return $this->hipsSize;
    }

    /**
     * Set waistSize
     *
     * @access public
     * @param float $waistSize
     * @return Measurement
     */
    public function setWaistSize($waistSize = null)
    {
        $this->waistSize = $waistSize;
        return $this;
    }

    /**
     * Get waistSize
     *
     * @access public
     * @return float 
     */
    public function getWaistSize()
    {
        return $this->waistSize;
    }

    /**
     * Set chestSize
     *
     * @access public
     * @param float $chestSize
     * @return Measurement
     */
    public function setChestSize($chestSize = null)
    {
        $this->chestSize = $chestSize;
        return $this;
    }

    /**
     * Get chestSize
     *
     * @access public
     * @return float 
     */
    public function getChestSize()
    {
        return $this->chestSize;
    }

    /**
     * Set bicepsSize
     *
     * @access public
     * @param float $bicepsSize
     * @return Measurement
     */
    public function setBicepsSize($bicepsSize = null)
    {
        $this->bicepsSize = $bicepsSize;
        return $this;
    }

    /**
     * Get bicepsSize
     *
     * @access public
     * @return float 
     */
    public function getBicepsSize()
    {
        return $this->bicepsSize;
    }

    /**
     * Set age
     *
     * @access public
     * @param float $age
     * @return Measurement
     */
    public function setAge($age = null)
    {
        $this->age = $age;
        return $this;
    }

    /**
     * Get age
     *
     * @access public
     * @return float 
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set patient
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Patient $patient
     * @return Measurement
     */
    public function setPatient(Patient $patient = null)
    {
        $this->patient = $patient;
        return $this;
    }

    /**
     * Get patient
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Patient 
     */
    public function getPatient()
    {
        return $this->patient;
    }

    /**
     * Set physicalActivity
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity $physicalActivity
     * @return Measurement
     */
    public function setPhysicalActivity(PhysicalActivity $physicalActivity = null)
    {
        $this->physicalActivity = $physicalActivity;
        return $this;
    }

    /**
     * Get physicalActivity
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity 
     */
    public function getPhysicalActivity()
    {
        return $this->physicalActivity;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Measurement
     */
    public function setCreatorUser(User $creatorUser = null)
    {
        $this->creatorUser = $creatorUser;
        return $this;
    }

    /**
     * Get creatorUser
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $modifierUser
     * @return Measurement
     */
    public function setModifierUser(User $modifierUser = null)
    {
        $this->modifierUser = $modifierUser;
        return $this;
    }

    /**
     * Get modifierUser
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\User 
     */
    public function getModifierUser()
    {
        return $this->modifierUser;
    }

    /**
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->setModifiedAt(new \DateTime('now'));
    }

    /**
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        if (is_null($this->getCreatedAt()))
        {
            $this->setCreatedAt(new \DateTime('now'));
        }
    }
}
