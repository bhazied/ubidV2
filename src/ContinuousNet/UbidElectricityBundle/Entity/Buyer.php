<?php

namespace ContinuousNet\UbidElectricityBundle\Entity;

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
 * Buyer Entity
 * 
 * Storing Buyers data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\UbidElectricityBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Entity
 * @see        Buyer
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`buyer`", indexes={@ORM\Index(name="buyer_type_id", columns={"buyer_type_id"}), @ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="language_id", columns={"language_id"}), @ORM\Index(name="first_market_region_id", columns={"first_market_region_id"}), @ORM\Index(name="second_market_region_id", columns={"second_market_region_id"}), @ORM\Index(name="third_market_region_id", columns={"third_market_region_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Buyer 
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
     * @ORM\Column(name="`name`", type="string", length=320, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description`", type="string", length=1024, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`main_products_services`", type="string", length=512, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $mainProductsServices;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`reference_number`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $referenceNumber;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`phone`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $phone;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fax`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fax;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`website`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $website;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`email`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $email;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`first_name`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $firstName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`last_name`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $lastName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`job`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $job;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`picture`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $picture;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`address`", type="string", length=500, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $address;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`zip_code`", type="string", length=10, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $zipCode;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`city`", type="string", length=10, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $city;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`company_name`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $companyName;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`total_revenu`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalRevenu;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`first_market_rate`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $firstMarketRate;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`second_market_rate`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $secondMarketRate;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`third_market_rate`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $thirdMarketRate;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_public`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isPublic;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`views`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $views;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`enable_comment`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $enableComment;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`enable_private_message`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $enablePrivateMessage;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`enable_share`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $enableShare;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\BuyerType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="BuyerType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="buyer_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $buyerType;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Country
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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Language
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Language")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="language_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $language;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Region
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Region")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="first_market_region_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $firstMarketRegion;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Region
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Region")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="second_market_region_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $secondMarketRegion;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Region
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Region")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="third_market_region_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $thirdMarketRegion;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\User
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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\User
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
     * @ORM\ManyToMany(targetEntity="Category")
     * @ORM\JoinTable(name="buyers_categories",
     *     joinColumns={
     *         @ORM\JoinColumn(name="buyer_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $categories;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->categories = new DoctrineCollection();
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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Buyer
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @access public
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @access public
     * @param string $description
     * @return Buyer
     */
    public function setDescription($description = null)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get description
     *
     * @access public
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set mainProductsServices
     *
     * @access public
     * @param string $mainProductsServices
     * @return Buyer
     */
    public function setMainProductsServices($mainProductsServices = null)
    {
        $this->mainProductsServices = $mainProductsServices;
        return $this;
    }

    /**
     * Get mainProductsServices
     *
     * @access public
     * @return string 
     */
    public function getMainProductsServices()
    {
        return $this->mainProductsServices;
    }

    /**
     * Set referenceNumber
     *
     * @access public
     * @param string $referenceNumber
     * @return Buyer
     */
    public function setReferenceNumber($referenceNumber = null)
    {
        $this->referenceNumber = $referenceNumber;
        return $this;
    }

    /**
     * Get referenceNumber
     *
     * @access public
     * @return string 
     */
    public function getReferenceNumber()
    {
        return $this->referenceNumber;
    }

    /**
     * Set phone
     *
     * @access public
     * @param string $phone
     * @return Buyer
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
     * Set fax
     *
     * @access public
     * @param string $fax
     * @return Buyer
     */
    public function setFax($fax = null)
    {
        $this->fax = $fax;
        return $this;
    }

    /**
     * Get fax
     *
     * @access public
     * @return string 
     */
    public function getFax()
    {
        return $this->fax;
    }

    /**
     * Set website
     *
     * @access public
     * @param string $website
     * @return Buyer
     */
    public function setWebsite($website = null)
    {
        $this->website = $website;
        return $this;
    }

    /**
     * Get website
     *
     * @access public
     * @return string 
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set email
     *
     * @access public
     * @param string $email
     * @return Buyer
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
     * Set firstName
     *
     * @access public
     * @param string $firstName
     * @return Buyer
     */
    public function setFirstName($firstName = null)
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
     * @return Buyer
     */
    public function setLastName($lastName = null)
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
     * Set job
     *
     * @access public
     * @param string $job
     * @return Buyer
     */
    public function setJob($job = null)
    {
        $this->job = $job;
        return $this;
    }

    /**
     * Get job
     *
     * @access public
     * @return string 
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Buyer
     */
    public function setPicture($picture = null)
    {
        $this->picture = $picture;
        return $this;
    }

    /**
     * Get picture
     *
     * @access public
     * @return string 
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set address
     *
     * @access public
     * @param string $address
     * @return Buyer
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
     * Set zipCode
     *
     * @access public
     * @param string $zipCode
     * @return Buyer
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
     * Set city
     *
     * @access public
     * @param string $city
     * @return Buyer
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
     * Set companyName
     *
     * @access public
     * @param string $companyName
     * @return Buyer
     */
    public function setCompanyName($companyName = null)
    {
        $this->companyName = $companyName;
        return $this;
    }

    /**
     * Get companyName
     *
     * @access public
     * @return string 
     */
    public function getCompanyName()
    {
        return $this->companyName;
    }

    /**
     * Set totalRevenu
     *
     * @access public
     * @param string $totalRevenu
     * @return Buyer
     */
    public function setTotalRevenu($totalRevenu = null)
    {
        $this->totalRevenu = $totalRevenu;
        return $this;
    }

    /**
     * Get totalRevenu
     *
     * @access public
     * @return string 
     */
    public function getTotalRevenu()
    {
        return $this->totalRevenu;
    }

    /**
     * Set firstMarketRate
     *
     * @access public
     * @param integer $firstMarketRate
     * @return Buyer
     */
    public function setFirstMarketRate($firstMarketRate = null)
    {
        $this->firstMarketRate = $firstMarketRate;
        return $this;
    }

    /**
     * Get firstMarketRate
     *
     * @access public
     * @return integer 
     */
    public function getFirstMarketRate()
    {
        return $this->firstMarketRate;
    }

    /**
     * Set secondMarketRate
     *
     * @access public
     * @param integer $secondMarketRate
     * @return Buyer
     */
    public function setSecondMarketRate($secondMarketRate = null)
    {
        $this->secondMarketRate = $secondMarketRate;
        return $this;
    }

    /**
     * Get secondMarketRate
     *
     * @access public
     * @return integer 
     */
    public function getSecondMarketRate()
    {
        return $this->secondMarketRate;
    }

    /**
     * Set thirdMarketRate
     *
     * @access public
     * @param integer $thirdMarketRate
     * @return Buyer
     */
    public function setThirdMarketRate($thirdMarketRate = null)
    {
        $this->thirdMarketRate = $thirdMarketRate;
        return $this;
    }

    /**
     * Get thirdMarketRate
     *
     * @access public
     * @return integer 
     */
    public function getThirdMarketRate()
    {
        return $this->thirdMarketRate;
    }

    /**
     * Set isPublic
     *
     * @access public
     * @param boolean $isPublic
     * @return Buyer
     */
    public function setIsPublic($isPublic)
    {
        $this->isPublic = $isPublic;
        return $this;
    }

    /**
     * Get isPublic
     *
     * @access public
     * @return boolean 
     */
    public function getIsPublic()
    {
        return $this->isPublic;
    }

    /**
     * Set views
     *
     * @access public
     * @param integer $views
     * @return Buyer
     */
    public function setViews($views = null)
    {
        $this->views = $views;
        return $this;
    }

    /**
     * Get views
     *
     * @access public
     * @return integer 
     */
    public function getViews()
    {
        return $this->views;
    }

    /**
     * Set enableComment
     *
     * @access public
     * @param boolean $enableComment
     * @return Buyer
     */
    public function setEnableComment($enableComment)
    {
        $this->enableComment = $enableComment;
        return $this;
    }

    /**
     * Get enableComment
     *
     * @access public
     * @return boolean 
     */
    public function getEnableComment()
    {
        return $this->enableComment;
    }

    /**
     * Set enablePrivateMessage
     *
     * @access public
     * @param boolean $enablePrivateMessage
     * @return Buyer
     */
    public function setEnablePrivateMessage($enablePrivateMessage)
    {
        $this->enablePrivateMessage = $enablePrivateMessage;
        return $this;
    }

    /**
     * Get enablePrivateMessage
     *
     * @access public
     * @return boolean 
     */
    public function getEnablePrivateMessage()
    {
        return $this->enablePrivateMessage;
    }

    /**
     * Set enableShare
     *
     * @access public
     * @param boolean $enableShare
     * @return Buyer
     */
    public function setEnableShare($enableShare)
    {
        $this->enableShare = $enableShare;
        return $this;
    }

    /**
     * Get enableShare
     *
     * @access public
     * @return boolean 
     */
    public function getEnableShare()
    {
        return $this->enableShare;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Buyer
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
     * @return Buyer
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
     * Set buyerType
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\BuyerType $buyerType
     * @return Buyer
     */
    public function setBuyerType(BuyerType $buyerType = null)
    {
        $this->buyerType = $buyerType;
        return $this;
    }

    /**
     * Get buyerType
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\BuyerType 
     */
    public function getBuyerType()
    {
        return $this->buyerType;
    }

    /**
     * Set country
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Country $country
     * @return Buyer
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
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Country 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set language
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Language $language
     * @return Buyer
     */
    public function setLanguage(Language $language = null)
    {
        $this->language = $language;
        return $this;
    }

    /**
     * Get language
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Language 
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set firstMarketRegion
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Region $firstMarketRegion
     * @return Buyer
     */
    public function setFirstMarketRegion(Region $firstMarketRegion = null)
    {
        $this->firstMarketRegion = $firstMarketRegion;
        return $this;
    }

    /**
     * Get firstMarketRegion
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Region 
     */
    public function getFirstMarketRegion()
    {
        return $this->firstMarketRegion;
    }

    /**
     * Set secondMarketRegion
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Region $secondMarketRegion
     * @return Buyer
     */
    public function setSecondMarketRegion(Region $secondMarketRegion = null)
    {
        $this->secondMarketRegion = $secondMarketRegion;
        return $this;
    }

    /**
     * Get secondMarketRegion
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Region 
     */
    public function getSecondMarketRegion()
    {
        return $this->secondMarketRegion;
    }

    /**
     * Set thirdMarketRegion
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Region $thirdMarketRegion
     * @return Buyer
     */
    public function setThirdMarketRegion(Region $thirdMarketRegion = null)
    {
        $this->thirdMarketRegion = $thirdMarketRegion;
        return $this;
    }

    /**
     * Get thirdMarketRegion
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Region 
     */
    public function getThirdMarketRegion()
    {
        return $this->thirdMarketRegion;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return Buyer
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
     * @return \ContinuousNet\UbidElectricityBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $modifierUser
     * @return Buyer
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
     * @return \ContinuousNet\UbidElectricityBundle\Entity\User 
     */
    public function getModifierUser()
    {
        return $this->modifierUser;
    }

    /**
     * Add category
     *
     * @access public
     * @param Category $category
     * @return Buyer
     */
    public function addCategory(Category $category)
    {
        if (!$this->categories->contains($category))
        {
            $this->categories->add($category);
        }
        return $this;
    }

    /**
     * Remove category
     *
     * @access public
     * @param Category $category
     * @return Buyer
     */
    public function removeCategory(Category $category)
    {
        if ($this->categories->contains($category))
        {
            $this->categories->removeElement($category);
        }
        return $this;
    }

    /**
     * Set category
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return Buyer
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;
        return $this;
    }

    /**
     * Get category
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCategories()
    {
        return $this->categories;
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
