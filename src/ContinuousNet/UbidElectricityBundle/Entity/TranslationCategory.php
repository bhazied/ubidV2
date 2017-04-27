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
 * Translation Category Entity
 * 
 * Storing TranslationCategories data to the database using Doctrine
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
 * @see        TranslationCategory
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`translation_category`", indexes={@ORM\Index(name="category_id", columns={"category_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class TranslationCategory 
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
     * @ORM\Column(name="`locale`", type="string", length=5, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $locale;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`name`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`meta_title`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $metaTitle;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`meta_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $metaDescription;

    /**
     * @var array
     * @access private
     *
     * @ORM\Column(name="`meta_keywords`", type="array", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $metaKeywords;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tenders_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tendersDescription;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tenders_meta_title`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tendersMetaTitle;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tenders_meta_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tendersMetaDescription;

    /**
     * @var array
     * @access private
     *
     * @ORM\Column(name="`tenders_meta_keywords`", type="array", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tendersMetaKeywords;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`consultations_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $consultationsDescription;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`consultations_meta_title`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $consultationsMetaTitle;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`consultations_meta_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $consultationsMetaDescription;

    /**
     * @var array
     * @access private
     *
     * @ORM\Column(name="`consultations_meta_keywords`", type="array", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $consultationsMetaKeywords;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`buyers_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $buyersDescription;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`buyers_meta_title`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $buyersMetaTitle;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`buyers_meta_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $buyersMetaDescription;

    /**
     * @var array
     * @access private
     *
     * @ORM\Column(name="`buyers_meta_keywords`", type="array", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $buyersMetaKeywords;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`suppliers_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $suppliersDescription;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`suppliers_meta_title`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $suppliersMetaTitle;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`suppliers_meta_description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $suppliersMetaDescription;

    /**
     * @var array
     * @access private
     *
     * @ORM\Column(name="`suppliers_meta_keywords`", type="array", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $suppliersMetaKeywords;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`validated`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $validated;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Category
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $category;

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
     * Set locale
     *
     * @access public
     * @param string $locale
     * @return TranslationCategory
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;
        return $this;
    }

    /**
     * Get locale
     *
     * @access public
     * @return string 
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * Set name
     *
     * @access public
     * @param string $name
     * @return TranslationCategory
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
     * @return TranslationCategory
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
     * Set metaTitle
     *
     * @access public
     * @param string $metaTitle
     * @return TranslationCategory
     */
    public function setMetaTitle($metaTitle = null)
    {
        $this->metaTitle = $metaTitle;
        return $this;
    }

    /**
     * Get metaTitle
     *
     * @access public
     * @return string 
     */
    public function getMetaTitle()
    {
        return $this->metaTitle;
    }

    /**
     * Set metaDescription
     *
     * @access public
     * @param string $metaDescription
     * @return TranslationCategory
     */
    public function setMetaDescription($metaDescription = null)
    {
        $this->metaDescription = $metaDescription;
        return $this;
    }

    /**
     * Get metaDescription
     *
     * @access public
     * @return string 
     */
    public function getMetaDescription()
    {
        return $this->metaDescription;
    }

    /**
     * Set metaKeywords
     *
     * @access public
     * @param array $metaKeywords
     * @return TranslationCategory
     */
    public function setMetaKeywords(array $metaKeywords = null)
    {
        $this->metaKeywords = $metaKeywords;
        return $this;
    }

    /**
     * Get metaKeywords
     *
     * @access public
     * @return array 
     */
    public function getMetaKeywords()
    {
        return $this->metaKeywords;
    }

    /**
     * Set tendersDescription
     *
     * @access public
     * @param string $tendersDescription
     * @return TranslationCategory
     */
    public function setTendersDescription($tendersDescription = null)
    {
        $this->tendersDescription = $tendersDescription;
        return $this;
    }

    /**
     * Get tendersDescription
     *
     * @access public
     * @return string 
     */
    public function getTendersDescription()
    {
        return $this->tendersDescription;
    }

    /**
     * Set tendersMetaTitle
     *
     * @access public
     * @param string $tendersMetaTitle
     * @return TranslationCategory
     */
    public function setTendersMetaTitle($tendersMetaTitle = null)
    {
        $this->tendersMetaTitle = $tendersMetaTitle;
        return $this;
    }

    /**
     * Get tendersMetaTitle
     *
     * @access public
     * @return string 
     */
    public function getTendersMetaTitle()
    {
        return $this->tendersMetaTitle;
    }

    /**
     * Set tendersMetaDescription
     *
     * @access public
     * @param string $tendersMetaDescription
     * @return TranslationCategory
     */
    public function setTendersMetaDescription($tendersMetaDescription = null)
    {
        $this->tendersMetaDescription = $tendersMetaDescription;
        return $this;
    }

    /**
     * Get tendersMetaDescription
     *
     * @access public
     * @return string 
     */
    public function getTendersMetaDescription()
    {
        return $this->tendersMetaDescription;
    }

    /**
     * Set tendersMetaKeywords
     *
     * @access public
     * @param array $tendersMetaKeywords
     * @return TranslationCategory
     */
    public function setTendersMetaKeywords(array $tendersMetaKeywords = null)
    {
        $this->tendersMetaKeywords = $tendersMetaKeywords;
        return $this;
    }

    /**
     * Get tendersMetaKeywords
     *
     * @access public
     * @return array 
     */
    public function getTendersMetaKeywords()
    {
        return $this->tendersMetaKeywords;
    }

    /**
     * Set consultationsDescription
     *
     * @access public
     * @param string $consultationsDescription
     * @return TranslationCategory
     */
    public function setConsultationsDescription($consultationsDescription = null)
    {
        $this->consultationsDescription = $consultationsDescription;
        return $this;
    }

    /**
     * Get consultationsDescription
     *
     * @access public
     * @return string 
     */
    public function getConsultationsDescription()
    {
        return $this->consultationsDescription;
    }

    /**
     * Set consultationsMetaTitle
     *
     * @access public
     * @param string $consultationsMetaTitle
     * @return TranslationCategory
     */
    public function setConsultationsMetaTitle($consultationsMetaTitle = null)
    {
        $this->consultationsMetaTitle = $consultationsMetaTitle;
        return $this;
    }

    /**
     * Get consultationsMetaTitle
     *
     * @access public
     * @return string 
     */
    public function getConsultationsMetaTitle()
    {
        return $this->consultationsMetaTitle;
    }

    /**
     * Set consultationsMetaDescription
     *
     * @access public
     * @param string $consultationsMetaDescription
     * @return TranslationCategory
     */
    public function setConsultationsMetaDescription($consultationsMetaDescription = null)
    {
        $this->consultationsMetaDescription = $consultationsMetaDescription;
        return $this;
    }

    /**
     * Get consultationsMetaDescription
     *
     * @access public
     * @return string 
     */
    public function getConsultationsMetaDescription()
    {
        return $this->consultationsMetaDescription;
    }

    /**
     * Set consultationsMetaKeywords
     *
     * @access public
     * @param array $consultationsMetaKeywords
     * @return TranslationCategory
     */
    public function setConsultationsMetaKeywords(array $consultationsMetaKeywords = null)
    {
        $this->consultationsMetaKeywords = $consultationsMetaKeywords;
        return $this;
    }

    /**
     * Get consultationsMetaKeywords
     *
     * @access public
     * @return array 
     */
    public function getConsultationsMetaKeywords()
    {
        return $this->consultationsMetaKeywords;
    }

    /**
     * Set buyersDescription
     *
     * @access public
     * @param string $buyersDescription
     * @return TranslationCategory
     */
    public function setBuyersDescription($buyersDescription = null)
    {
        $this->buyersDescription = $buyersDescription;
        return $this;
    }

    /**
     * Get buyersDescription
     *
     * @access public
     * @return string 
     */
    public function getBuyersDescription()
    {
        return $this->buyersDescription;
    }

    /**
     * Set buyersMetaTitle
     *
     * @access public
     * @param string $buyersMetaTitle
     * @return TranslationCategory
     */
    public function setBuyersMetaTitle($buyersMetaTitle = null)
    {
        $this->buyersMetaTitle = $buyersMetaTitle;
        return $this;
    }

    /**
     * Get buyersMetaTitle
     *
     * @access public
     * @return string 
     */
    public function getBuyersMetaTitle()
    {
        return $this->buyersMetaTitle;
    }

    /**
     * Set buyersMetaDescription
     *
     * @access public
     * @param string $buyersMetaDescription
     * @return TranslationCategory
     */
    public function setBuyersMetaDescription($buyersMetaDescription = null)
    {
        $this->buyersMetaDescription = $buyersMetaDescription;
        return $this;
    }

    /**
     * Get buyersMetaDescription
     *
     * @access public
     * @return string 
     */
    public function getBuyersMetaDescription()
    {
        return $this->buyersMetaDescription;
    }

    /**
     * Set buyersMetaKeywords
     *
     * @access public
     * @param array $buyersMetaKeywords
     * @return TranslationCategory
     */
    public function setBuyersMetaKeywords(array $buyersMetaKeywords = null)
    {
        $this->buyersMetaKeywords = $buyersMetaKeywords;
        return $this;
    }

    /**
     * Get buyersMetaKeywords
     *
     * @access public
     * @return array 
     */
    public function getBuyersMetaKeywords()
    {
        return $this->buyersMetaKeywords;
    }

    /**
     * Set suppliersDescription
     *
     * @access public
     * @param string $suppliersDescription
     * @return TranslationCategory
     */
    public function setSuppliersDescription($suppliersDescription = null)
    {
        $this->suppliersDescription = $suppliersDescription;
        return $this;
    }

    /**
     * Get suppliersDescription
     *
     * @access public
     * @return string 
     */
    public function getSuppliersDescription()
    {
        return $this->suppliersDescription;
    }

    /**
     * Set suppliersMetaTitle
     *
     * @access public
     * @param string $suppliersMetaTitle
     * @return TranslationCategory
     */
    public function setSuppliersMetaTitle($suppliersMetaTitle = null)
    {
        $this->suppliersMetaTitle = $suppliersMetaTitle;
        return $this;
    }

    /**
     * Get suppliersMetaTitle
     *
     * @access public
     * @return string 
     */
    public function getSuppliersMetaTitle()
    {
        return $this->suppliersMetaTitle;
    }

    /**
     * Set suppliersMetaDescription
     *
     * @access public
     * @param string $suppliersMetaDescription
     * @return TranslationCategory
     */
    public function setSuppliersMetaDescription($suppliersMetaDescription = null)
    {
        $this->suppliersMetaDescription = $suppliersMetaDescription;
        return $this;
    }

    /**
     * Get suppliersMetaDescription
     *
     * @access public
     * @return string 
     */
    public function getSuppliersMetaDescription()
    {
        return $this->suppliersMetaDescription;
    }

    /**
     * Set suppliersMetaKeywords
     *
     * @access public
     * @param array $suppliersMetaKeywords
     * @return TranslationCategory
     */
    public function setSuppliersMetaKeywords(array $suppliersMetaKeywords = null)
    {
        $this->suppliersMetaKeywords = $suppliersMetaKeywords;
        return $this;
    }

    /**
     * Get suppliersMetaKeywords
     *
     * @access public
     * @return array 
     */
    public function getSuppliersMetaKeywords()
    {
        return $this->suppliersMetaKeywords;
    }

    /**
     * Set validated
     *
     * @access public
     * @param boolean $validated
     * @return TranslationCategory
     */
    public function setValidated($validated)
    {
        $this->validated = $validated;
        return $this;
    }

    /**
     * Get validated
     *
     * @access public
     * @return boolean 
     */
    public function getValidated()
    {
        return $this->validated;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return TranslationCategory
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
     * @return TranslationCategory
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
     * Set category
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Category $category
     * @return TranslationCategory
     */
    public function setCategory(Category $category = null)
    {
        $this->category = $category;
        return $this;
    }

    /**
     * Get category
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Category 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return TranslationCategory
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
     * @return TranslationCategory
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
