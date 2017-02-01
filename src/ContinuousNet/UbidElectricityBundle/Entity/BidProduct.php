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
 * Bid Product Entity
 * 
 * Storing BidProducts data to the database using Doctrine
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
 * @see        BidProduct
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`bid_product`", indexes={@ORM\Index(name="tender_product_id", columns={"tender_product_id"}), @ORM\Index(name="bid_id", columns={"bid_id"}), @ORM\Index(name="supplier_product_id", columns={"supplier_product_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class BidProduct 
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
     * @var float
     * @access private
     *
     * @ORM\Column(name="`new_unit_cost`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $newUnitCost;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`quantity`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $quantity;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`duration`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $duration;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\TenderProduct
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="TenderProduct")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="`tender_product_id`", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $tenderProduct;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Bid
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Bid")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="`bid_id`", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $bid;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\SupplierProduct
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="SupplierProduct")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="`supplier_product_id`", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $supplierProduct;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="`creator_user_id`", referencedColumnName="id")
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
     *        @ORM\JoinColumn(name="`modifier_user_id`", referencedColumnName="id")
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
     * Set newUnitCost
     *
     * @access public
     * @param float $newUnitCost
     * @return BidProduct
     */
    public function setNewUnitCost($newUnitCost = null)
    {
        $this->newUnitCost = $newUnitCost;
        return $this;
    }

    /**
     * Get newUnitCost
     *
     * @access public
     * @return float 
     */
    public function getNewUnitCost()
    {
        return $this->newUnitCost;
    }

    /**
     * Set quantity
     *
     * @access public
     * @param float $quantity
     * @return BidProduct
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
     * @return BidProduct
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
     * @return BidProduct
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
     * @return BidProduct
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
     * @return BidProduct
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
     * Set tenderProduct
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\TenderProduct $tenderProduct
     * @return BidProduct
     */
    public function setTenderProduct(TenderProduct $tenderProduct = null)
    {
        $this->tenderProduct = $tenderProduct;
        return $this;
    }

    /**
     * Get tenderProduct
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\TenderProduct 
     */
    public function getTenderProduct()
    {
        return $this->tenderProduct;
    }

    /**
     * Set bid
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Bid $bid
     * @return BidProduct
     */
    public function setBid(Bid $bid = null)
    {
        $this->bid = $bid;
        return $this;
    }

    /**
     * Get bid
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Bid 
     */
    public function getBid()
    {
        return $this->bid;
    }

    /**
     * Set supplierProduct
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\SupplierProduct $supplierProduct
     * @return BidProduct
     */
    public function setSupplierProduct(SupplierProduct $supplierProduct = null)
    {
        $this->supplierProduct = $supplierProduct;
        return $this;
    }

    /**
     * Get supplierProduct
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\SupplierProduct 
     */
    public function getSupplierProduct()
    {
        return $this->supplierProduct;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return BidProduct
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
     * @return BidProduct
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
