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
 * Category Entity
 * 
 * Storing Categories data to the database using Doctrine
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
 * @see        Category
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`category`", indexes={@ORM\Index(name="parent_category_id", columns={"parent_category_id"}), @ORM\Index(name="product_type_id", columns={"product_type_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Category 
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
     * @ORM\Column(name="`slug`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

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
     * @ORM\Column(name="`description`", type="string", length=320, nullable=false, unique=false)
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
     * @var string
     * @access private
     *
     * @ORM\Column(name="`meta_keywords`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $metaKeywords;

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
     * @var string
     * @access private
     *
     * @ORM\Column(name="`tenders_meta_keywords`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $tendersMetaKeywords;

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
     * @var string
     * @access private
     *
     * @ORM\Column(name="`consultations_meta_keywords`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $consultationsMetaKeywords;

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
     * @var string
     * @access private
     *
     * @ORM\Column(name="`buyers_meta_keywords`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $buyersMetaKeywords;

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
     * @var string
     * @access private
     *
     * @ORM\Column(name="`suppliers_meta_keywords`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $suppliersMetaKeywords;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`ordering`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ordering;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Category
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="parent_category_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $parentCategory;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\ProductType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="ProductType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="product_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $productType;

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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Category
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
     * Set slug
     *
     * @access public
     * @param string $slug
     * @return Category
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
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Category
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
     * Set description
     *
     * @access public
     * @param string $description
     * @return Category
     */
    public function setDescription($description)
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
     * @return Category
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
     * @return Category
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
     * @param string $metaKeywords
     * @return Category
     */
    public function setMetaKeywords($metaKeywords = null)
    {
        $this->metaKeywords = $metaKeywords;
        return $this;
    }

    /**
     * Get metaKeywords
     *
     * @access public
     * @return string
     */
    public function getMetaKeywords()
    {
        return $this->metaKeywords;
    }

    /**
     * Set tendersMetaTitle
     *
     * @access public
     * @param string $tendersMetaTitle
     * @return Category
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
     * @return Category
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
     * @param string $tendersMetaKeywords
     * @return Category
     */
    public function setTendersMetaKeywords($tendersMetaKeywords = null)
    {
        $this->tendersMetaKeywords = $tendersMetaKeywords;
        return $this;
    }

    /**
     * Get tendersMetaKeywords
     *
     * @access public
     * @return string
     */
    public function getTendersMetaKeywords()
    {
        return $this->tendersMetaKeywords;
    }

    /**
     * Set consultationsMetaTitle
     *
     * @access public
     * @param string $consultationsMetaTitle
     * @return Category
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
     * @return Category
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
     * @param string $consultationsMetaKeywords
     * @return Category
     */
    public function setConsultationsMetaKeywords($consultationsMetaKeywords = null)
    {
        $this->consultationsMetaKeywords = $consultationsMetaKeywords;
        return $this;
    }

    /**
     * Get consultationsMetaKeywords
     *
     * @access public
     * @return string
     */
    public function getConsultationsMetaKeywords()
    {
        return $this->consultationsMetaKeywords;
    }

    /**
     * Set buyersMetaTitle
     *
     * @access public
     * @param string $buyersMetaTitle
     * @return Category
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
     * @return Category
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
     * @param string $buyersMetaKeywords
     * @return Category
     */
    public function setBuyersMetaKeywords($buyersMetaKeywords = null)
    {
        $this->buyersMetaKeywords = $buyersMetaKeywords;
        return $this;
    }

    /**
     * Get buyersMetaKeywords
     *
     * @access public
     * @return string
     */
    public function getBuyersMetaKeywords()
    {
        return $this->buyersMetaKeywords;
    }

    /**
     * Set suppliersMetaTitle
     *
     * @access public
     * @param string $suppliersMetaTitle
     * @return Category
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
     * @return Category
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
     * @param string $suppliersMetaKeywords
     * @return Category
     */
    public function setSuppliersMetaKeywords($suppliersMetaKeywords = null)
    {
        $this->suppliersMetaKeywords = $suppliersMetaKeywords;
        return $this;
    }

    /**
     * Get suppliersMetaKeywords
     *
     * @access public
     * @return string
     */
    public function getSuppliersMetaKeywords()
    {
        return $this->suppliersMetaKeywords;
    }

    /**
     * Set ordering
     *
     * @access public
     * @param integer $ordering
     * @return Category
     */
    public function setOrdering($ordering = null)
    {
        $this->ordering = $ordering;
        return $this;
    }

    /**
     * Get ordering
     *
     * @access public
     * @return integer 
     */
    public function getOrdering()
    {
        return $this->ordering;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Category
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
     * @return Category
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
     * @return Category
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
     * Set parentCategory
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Category $parentCategory
     * @return Category
     */
    public function setParentCategory(Category $parentCategory = null)
    {
        $this->parentCategory = $parentCategory;
        return $this;
    }

    /**
     * Get parentCategory
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Category 
     */
    public function getParentCategory()
    {
        return $this->parentCategory;
    }

    /**
     * Set productType
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\ProductType $productType
     * @return Category
     */
    public function setProductType(ProductType $productType = null)
    {
        $this->productType = $productType;
        return $this;
    }

    /**
     * Get productType
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\ProductType 
     */
    public function getProductType()
    {
        return $this->productType;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return Category
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
     * @return Category
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
