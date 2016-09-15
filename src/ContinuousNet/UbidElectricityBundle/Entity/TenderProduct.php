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
 * Tender Product Entity
 * 
 * Storing TenderProducts data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\UbidElectricityBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Entity
 * @see        TenderProduct
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`tender_product`", indexes={@ORM\Index(name="tender_id", columns={"tender_id"}), @ORM\Index(name="product_type_id", columns={"product_type_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class TenderProduct 
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
     * @ORM\Column(name="title", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $title;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="slug", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="description", type="text", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="status", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $status;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="unit_cost", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $unitCost;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="quantity", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $quantity;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="duration", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $duration;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="ordering", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ordering;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $createdAt;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="modified_at", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $modifiedAt;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Tender
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Tender")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="tender_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $tender;

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
     * Set title
     *
     * @access public
     * @param string $title
     * @return TenderProduct
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Get title
     *
     * @access public
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set slug
     *
     * @access public
     * @param string $slug
     * @return TenderProduct
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
     * Set description
     *
     * @access public
     * @param string $description
     * @return TenderProduct
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
     * Set status
     *
     * @access public
     * @param string $status
     * @return TenderProduct
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
     * Set unitCost
     *
     * @access public
     * @param float $unitCost
     * @return TenderProduct
     */
    public function setUnitCost($unitCost = null)
    {
        $this->unitCost = $unitCost;
        return $this;
    }

    /**
     * Get unitCost
     *
     * @access public
     * @return float 
     */
    public function getUnitCost()
    {
        return $this->unitCost;
    }

    /**
     * Set quantity
     *
     * @access public
     * @param float $quantity
     * @return TenderProduct
     */
    public function setQuantity($quantity = null)
    {
        $this->quantity = $quantity;
        return $this;
    }

    /**
     * Get quantity
     *
     * @access public
     * @return float 
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set duration
     *
     * @access public
     * @param float $duration
     * @return TenderProduct
     */
    public function setDuration($duration = null)
    {
        $this->duration = $duration;
        return $this;
    }

    /**
     * Get duration
     *
     * @access public
     * @return float 
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * Set ordering
     *
     * @access public
     * @param integer $ordering
     * @return TenderProduct
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
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return TenderProduct
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
     * @return TenderProduct
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
     * Set tender
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Tender $tender
     * @return TenderProduct
     */
    public function setTender(Tender $tender = null)
    {
        $this->tender = $tender;
        return $this;
    }

    /**
     * Get tender
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Tender 
     */
    public function getTender()
    {
        return $this->tender;
    }

    /**
     * Set productType
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\ProductType $productType
     * @return TenderProduct
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
     * @return TenderProduct
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
     * @return TenderProduct
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
