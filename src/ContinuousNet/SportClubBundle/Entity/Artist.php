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
 * Artist Entity
 * 
 * Storing Artists data to the database using Doctrine
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
 * @see        Artist
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`artist`", indexes={@ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Artist 
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
     * @ORM\Column(name="`name`", type="string", length=100, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`name_ar`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $nameAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`name_fr`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $nameFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug`", type="string", length=100, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug_ar`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slugAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug_fr`", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slugFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`start_with`", type="string", length=3, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $startWith;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`start_with_ar`", type="string", length=3, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $startWithAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`start_with_fr`", type="string", length=3, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $startWithFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`type`", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $type;

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
     * @ORM\Column(name="`picture`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $picture;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_published`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isPublished;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_recommended`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isRecommended;

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
     * @return Artist
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
     * @return Artist
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
     * @return Artist
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
     * Set slug
     *
     * @access public
     * @param string $slug
     * @return Artist
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * Get slug
     *
     * @access public
     * @return string 
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set slugAr
     *
     * @access public
     * @param string $slugAr
     * @return Artist
     */
    public function setSlugAr($slugAr = null)
    {
        $this->slugAr = $slugAr;
        return $this;
    }

    /**
     * Get slugAr
     *
     * @access public
     * @return string 
     */
    public function getSlugAr()
    {
        return $this->slugAr;
    }

    /**
     * Set slugFr
     *
     * @access public
     * @param string $slugFr
     * @return Artist
     */
    public function setSlugFr($slugFr = null)
    {
        $this->slugFr = $slugFr;
        return $this;
    }

    /**
     * Get slugFr
     *
     * @access public
     * @return string 
     */
    public function getSlugFr()
    {
        return $this->slugFr;
    }

    /**
     * Set startWith
     *
     * @access public
     * @param string $startWith
     * @return Artist
     */
    public function setStartWith($startWith)
    {
        $this->startWith = $startWith;
        return $this;
    }

    /**
     * Get startWith
     *
     * @access public
     * @return string 
     */
    public function getStartWith()
    {
        return $this->startWith;
    }

    /**
     * Set startWithAr
     *
     * @access public
     * @param string $startWithAr
     * @return Artist
     */
    public function setStartWithAr($startWithAr = null)
    {
        $this->startWithAr = $startWithAr;
        return $this;
    }

    /**
     * Get startWithAr
     *
     * @access public
     * @return string 
     */
    public function getStartWithAr()
    {
        return $this->startWithAr;
    }

    /**
     * Set startWithFr
     *
     * @access public
     * @param string $startWithFr
     * @return Artist
     */
    public function setStartWithFr($startWithFr = null)
    {
        $this->startWithFr = $startWithFr;
        return $this;
    }

    /**
     * Get startWithFr
     *
     * @access public
     * @return string 
     */
    public function getStartWithFr()
    {
        return $this->startWithFr;
    }

    /**
     * Set type
     *
     * @access public
     * @param string $type
     * @return Artist
     */
    public function setType($type = null)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Get type
     *
     * @access public
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set birthDate
     *
     * @access public
     * @param \DateTime $birthDate
     * @return Artist
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
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Artist
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
     * Set isPublished
     *
     * @access public
     * @param boolean $isPublished
     * @return Artist
     */
    public function setIsPublished($isPublished)
    {
        $this->isPublished = $isPublished;
        return $this;
    }

    /**
     * Get isPublished
     *
     * @access public
     * @return boolean 
     */
    public function getIsPublished()
    {
        return $this->isPublished;
    }

    /**
     * Set isRecommended
     *
     * @access public
     * @param boolean $isRecommended
     * @return Artist
     */
    public function setIsRecommended($isRecommended)
    {
        $this->isRecommended = $isRecommended;
        return $this;
    }

    /**
     * Get isRecommended
     *
     * @access public
     * @return boolean 
     */
    public function getIsRecommended()
    {
        return $this->isRecommended;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Artist
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
     * @return Artist
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
     * @return Artist
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
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $creatorUser
     * @return Artist
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
     * @return Artist
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
