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
 * Patient Entity
 * 
 * Storing Patients data to the database using Doctrine
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
 * @see        Patient
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`patient`", indexes={@ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="physical_activity_id", columns={"physical_activity_id"}), @ORM\Index(name="primary_pathology_id", columns={"primary_pathology_id"}), @ORM\Index(name="secondary_pathology_id", columns={"secondary_pathology_id"}), @ORM\Index(name="template_id", columns={"template_id"}), @ORM\Index(name="temporary_template_id", columns={"temporary_template_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Patient 
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
     * @ORM\Column(name="`first_name`", type="string", length=45, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $firstName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`last_name`", type="string", length=45, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $lastName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`group_name`", type="string", length=200, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $groupName;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`birth_date`", type="date", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $birthDate;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`gender`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $gender;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`address`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $address;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`city`", type="string", length=45, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $city;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`zip_code`", type="string", length=45, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $zipCode;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`state`", type="string", length=45, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $state;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`mobile_number`", type="string", length=45, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mobileNumber;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`email`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $email;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`phone`", type="string", length=15, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $phone;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`height`", type="float", precision=10, scale=0, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $height;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`cup_size`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $cupSize;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`typology`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $typology;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`athletic`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $athletic;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`special_diet`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $specialDiet;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`hormonal_status`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $hormonalStatus;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`puberty_tanner_stage`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $pubertyTannerStage;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`precautions_contraindications`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $precautionsContraindications;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`other_pathologies`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $otherPathologies;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`uuid`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $uuid;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Country
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Country")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="country_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $country;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Pathology
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Pathology")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="primary_pathology_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $primaryPathology;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Pathology
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Pathology")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="secondary_pathology_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $secondaryPathology;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Template
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Template")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="template_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $template;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Template
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Template")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="temporary_template_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $temporaryTemplate;

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
     * @var \Doctrine\Common\Collections\Collection
     * @access private
     *
     * @ORM\ManyToMany(targetEntity="PatientGroup")
     * @ORM\JoinTable(name="patients_patient_groups",
     *     joinColumns={
     *         @ORM\JoinColumn(name="patient_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="patient_group_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $patientGroups;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->patientGroups = new DoctrineCollection();
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
     * Set firstName
     *
     * @access public
     * @param string $firstName
     * @return Patient
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * Get firstName
     *
     * @access public
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @access public
     * @param string $lastName
     * @return Patient
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * Get lastName
     *
     * @access public
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set groupName
     *
     * @access public
     * @param string $groupName
     * @return Patient
     */
    public function setGroupName($groupName = null)
    {
        $this->groupName = $groupName;
        return $this;
    }

    /**
     * Get groupName
     *
     * @access public
     * @return string 
     */
    public function getGroupName()
    {
        return $this->groupName;
    }

    /**
     * Set birthDate
     *
     * @access public
     * @param \DateTime $birthDate
     * @return Patient
     */
    public function setBirthDate(\DateTime $birthDate)
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
     * Set gender
     *
     * @access public
     * @param string $gender
     * @return Patient
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
        return $this;
    }

    /**
     * Get gender
     *
     * @access public
     * @return string 
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set address
     *
     * @access public
     * @param string $address
     * @return Patient
     */
    public function setAddress($address = null)
    {
        $this->address = $address;
        return $this;
    }

    /**
     * Get address
     *
     * @access public
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set city
     *
     * @access public
     * @param string $city
     * @return Patient
     */
    public function setCity($city = null)
    {
        $this->city = $city;
        return $this;
    }

    /**
     * Get city
     *
     * @access public
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set zipCode
     *
     * @access public
     * @param string $zipCode
     * @return Patient
     */
    public function setZipCode($zipCode = null)
    {
        $this->zipCode = $zipCode;
        return $this;
    }

    /**
     * Get zipCode
     *
     * @access public
     * @return string 
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * Set state
     *
     * @access public
     * @param string $state
     * @return Patient
     */
    public function setState($state = null)
    {
        $this->state = $state;
        return $this;
    }

    /**
     * Get state
     *
     * @access public
     * @return string 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set mobileNumber
     *
     * @access public
     * @param string $mobileNumber
     * @return Patient
     */
    public function setMobileNumber($mobileNumber = null)
    {
        $this->mobileNumber = $mobileNumber;
        return $this;
    }

    /**
     * Get mobileNumber
     *
     * @access public
     * @return string 
     */
    public function getMobileNumber()
    {
        return $this->mobileNumber;
    }

    /**
     * Set email
     *
     * @access public
     * @param string $email
     * @return Patient
     */
    public function setEmail($email = null)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get email
     *
     * @access public
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set phone
     *
     * @access public
     * @param string $phone
     * @return Patient
     */
    public function setPhone($phone = null)
    {
        $this->phone = $phone;
        return $this;
    }

    /**
     * Get phone
     *
     * @access public
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set height
     *
     * @access public
     * @param float $height
     * @return Patient
     */
    public function setHeight($height)
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
     * @return Patient
     */
    public function setCupSize($cupSize)
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
     * Set typology
     *
     * @access public
     * @param string $typology
     * @return Patient
     */
    public function setTypology($typology = null)
    {
        $this->typology = $typology;
        return $this;
    }

    /**
     * Get typology
     *
     * @access public
     * @return string 
     */
    public function getTypology()
    {
        return $this->typology;
    }

    /**
     * Set athletic
     *
     * @access public
     * @param boolean $athletic
     * @return Patient
     */
    public function setAthletic($athletic)
    {
        $this->athletic = $athletic;
        return $this;
    }

    /**
     * Get athletic
     *
     * @access public
     * @return boolean 
     */
    public function getAthletic()
    {
        return $this->athletic;
    }

    /**
     * Set specialDiet
     *
     * @access public
     * @param string $specialDiet
     * @return Patient
     */
    public function setSpecialDiet($specialDiet = null)
    {
        $this->specialDiet = $specialDiet;
        return $this;
    }

    /**
     * Get specialDiet
     *
     * @access public
     * @return string 
     */
    public function getSpecialDiet()
    {
        return $this->specialDiet;
    }

    /**
     * Set hormonalStatus
     *
     * @access public
     * @param string $hormonalStatus
     * @return Patient
     */
    public function setHormonalStatus($hormonalStatus = null)
    {
        $this->hormonalStatus = $hormonalStatus;
        return $this;
    }

    /**
     * Get hormonalStatus
     *
     * @access public
     * @return string 
     */
    public function getHormonalStatus()
    {
        return $this->hormonalStatus;
    }

    /**
     * Set pubertyTannerStage
     *
     * @access public
     * @param string $pubertyTannerStage
     * @return Patient
     */
    public function setPubertyTannerStage($pubertyTannerStage = null)
    {
        $this->pubertyTannerStage = $pubertyTannerStage;
        return $this;
    }

    /**
     * Get pubertyTannerStage
     *
     * @access public
     * @return string 
     */
    public function getPubertyTannerStage()
    {
        return $this->pubertyTannerStage;
    }

    /**
     * Set precautionsContraindications
     *
     * @access public
     * @param string $precautionsContraindications
     * @return Patient
     */
    public function setPrecautionsContraindications($precautionsContraindications = null)
    {
        $this->precautionsContraindications = $precautionsContraindications;
        return $this;
    }

    /**
     * Get precautionsContraindications
     *
     * @access public
     * @return string 
     */
    public function getPrecautionsContraindications()
    {
        return $this->precautionsContraindications;
    }

    /**
     * Set otherPathologies
     *
     * @access public
     * @param string $otherPathologies
     * @return Patient
     */
    public function setOtherPathologies($otherPathologies = null)
    {
        $this->otherPathologies = $otherPathologies;
        return $this;
    }

    /**
     * Get otherPathologies
     *
     * @access public
     * @return string 
     */
    public function getOtherPathologies()
    {
        return $this->otherPathologies;
    }

    /**
     * Set uuid
     *
     * @access public
     * @param string $uuid
     * @return Patient
     */
    public function setUuid($uuid = null)
    {
        $this->uuid = $uuid;
        return $this;
    }

    /**
     * Get uuid
     *
     * @access public
     * @return string 
     */
    public function getUuid()
    {
        return $this->uuid;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Patient
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
     * @return Patient
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
     * Set country
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Country $country
     * @return Patient
     */
    public function setCountry(Country $country = null)
    {
        $this->country = $country;
        return $this;
    }

    /**
     * Get country
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Country 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set physicalActivity
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity $physicalActivity
     * @return Patient
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
     * Set primaryPathology
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Pathology $primaryPathology
     * @return Patient
     */
    public function setPrimaryPathology(Pathology $primaryPathology = null)
    {
        $this->primaryPathology = $primaryPathology;
        return $this;
    }

    /**
     * Get primaryPathology
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Pathology 
     */
    public function getPrimaryPathology()
    {
        return $this->primaryPathology;
    }

    /**
     * Set secondaryPathology
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Pathology $secondaryPathology
     * @return Patient
     */
    public function setSecondaryPathology(Pathology $secondaryPathology = null)
    {
        $this->secondaryPathology = $secondaryPathology;
        return $this;
    }

    /**
     * Get secondaryPathology
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Pathology 
     */
    public function getSecondaryPathology()
    {
        return $this->secondaryPathology;
    }

    /**
     * Set template
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Template $template
     * @return Patient
     */
    public function setTemplate(Template $template = null)
    {
        $this->template = $template;
        return $this;
    }

    /**
     * Get template
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Template 
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * Set temporaryTemplate
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Template $temporaryTemplate
     * @return Patient
     */
    public function setTemporaryTemplate(Template $temporaryTemplate = null)
    {
        $this->temporaryTemplate = $temporaryTemplate;
        return $this;
    }

    /**
     * Get temporaryTemplate
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Template 
     */
    public function getTemporaryTemplate()
    {
        return $this->temporaryTemplate;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Patient
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
     * @return Patient
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
     * Add patientGroup
     *
     * @access public
     * @param PatientGroup $patientGroup
     * @return Patient
     */
    public function addPatientGroup(PatientGroup $patientGroup)
    {
        if (!$this->patientGroups->contains($patientGroup))
        {
            $this->patientGroups->add($patientGroup);
        }
        return $this;
    }

    /**
     * Remove patientGroup
     *
     * @access public
     * @param PatientGroup $patientGroup
     * @return Patient
     */
    public function removePatientGroup(PatientGroup $patientGroup)
    {
        if ($this->patientGroups->contains($patientGroup))
        {
            $this->patientGroups->removeElement($patientGroup);
        }
        return $this;
    }

    /**
     * Set patientGroup
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return Patient
     */
    public function setPatientGroups($patientGroups)
    {
        $this->patientGroups = $patientGroups;
        return $this;
    }

    /**
     * Get patientGroup
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPatientGroups()
    {
        return $this->patientGroups;
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
