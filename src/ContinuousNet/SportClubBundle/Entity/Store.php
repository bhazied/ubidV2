<?php

namespace ContinuousNet\SportClubBundle\Entity;

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
 * Store Entity
 * 
 * Storing Stores data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\SportClubBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Entity
 * @see        Store
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`store`", indexes={@ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="city_id", columns={"city_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Store 
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
     * @ORM\Column(name="`name_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $nameAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`name_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $nameFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`address`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $address;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`address_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $addressAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`address_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $addressFr;

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
     * @ORM\Column(name="`location`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $location;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`phone`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $phone;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`fax`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fax;

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
     * @ORM\Column(name="`picture`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $picture;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`status`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $status;

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
     * @var \ContinuousNet\SportClubBundle\Entity\Country
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
     * @var \ContinuousNet\SportClubBundle\Entity\City
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="City")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="city_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $city;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\User
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
     * @var \ContinuousNet\SportClubBundle\Entity\User
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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Store
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
     * Set nameAr
     *
     * @access public
     * @param string $nameAr
     * @return Store
     */
    public function setNameAr($nameAr = null)
    {
        $this->nameAr = $nameAr;
        return $this;
    }

    /**
     * Get nameAr
     *
     * @access public
     * @return string 
     */
    public function getNameAr()
    {
        return $this->nameAr;
    }

    /**
     * Set nameFr
     *
     * @access public
     * @param string $nameFr
     * @return Store
     */
    public function setNameFr($nameFr = null)
    {
        $this->nameFr = $nameFr;
        return $this;
    }

    /**
     * Get nameFr
     *
     * @access public
     * @return string 
     */
    public function getNameFr()
    {
        return $this->nameFr;
    }

    /**
     * Set address
     *
     * @access public
     * @param string $address
     * @return Store
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
     * Set addressAr
     *
     * @access public
     * @param string $addressAr
     * @return Store
     */
    public function setAddressAr($addressAr = null)
    {
        $this->addressAr = $addressAr;
        return $this;
    }

    /**
     * Get addressAr
     *
     * @access public
     * @return string 
     */
    public function getAddressAr()
    {
        return $this->addressAr;
    }

    /**
     * Set addressFr
     *
     * @access public
     * @param string $addressFr
     * @return Store
     */
    public function setAddressFr($addressFr = null)
    {
        $this->addressFr = $addressFr;
        return $this;
    }

    /**
     * Get addressFr
     *
     * @access public
     * @return string 
     */
    public function getAddressFr()
    {
        return $this->addressFr;
    }

    /**
     * Set zipCode
     *
     * @access public
     * @param string $zipCode
     * @return Store
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
     * Set location
     *
     * @access public
     * @param string $location
     * @return Store
     */
    public function setLocation($location = null)
    {
        $this->location = $location;
        return $this;
    }

    /**
     * Get location
     *
     * @access public
     * @return string 
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set phone
     *
     * @access public
     * @param string $phone
     * @return Store
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
     * @return Store
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
     * Set email
     *
     * @access public
     * @param string $email
     * @return Store
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
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Store
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
     * Set status
     *
     * @access public
     * @param string $status
     * @return Store
     */
    public function setStatus($status)
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
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Store
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
     * @return Store
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
     * @param \ContinuousNet\SportClubBundle\Entity\Country $country
     * @return Store
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
     * @return \ContinuousNet\SportClubBundle\Entity\Country 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set city
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\City $city
     * @return Store
     */
    public function setCity(City $city = null)
    {
        $this->city = $city;
        return $this;
    }

    /**
     * Get city
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\City 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $creatorUser
     * @return Store
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
     * @return \ContinuousNet\SportClubBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $modifierUser
     * @return Store
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
     * @return \ContinuousNet\SportClubBundle\Entity\User 
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
