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
 * Tender Entity
 * 
 * Storing Tenders data to the database using Doctrine
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
 * @see        Tender
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`tender`", indexes={@ORM\Index(name="buyer_id", columns={"buyer_id"}), @ORM\Index(name="supplier_id", columns={"supplier_id"}), @ORM\Index(name="region_id", columns={"region_id"}), @ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="sector_id", columns={"sector_id"}), @ORM\Index(name="tender_type_id", columns={"tender_type_id"}), @ORM\Index(name="bidding_type_id", columns={"bidding_type_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Tender 
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
     * @ORM\Column(name="`section`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $section;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`title`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $title;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`reference`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $reference;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`fees`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fees;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description`", type="text", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

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
     * @ORM\Column(name="`publish_date`", type="date", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $publishDate;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`deadline`", type="date", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $deadline;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`estimated_cost`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $estimatedCost;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`attachment_files`", type="string", length=1000, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $attachmentFiles;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`source`", type="string", length=511, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $source;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Buyer
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Buyer")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="buyer_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $buyer;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Supplier
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Supplier")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="supplier_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $supplier;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Region
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Region")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="region_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $region;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Sector
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Sector")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="sector_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $sector;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\TenderType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="TenderType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="tender_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $tenderType;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\BiddingType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="BiddingType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="bidding_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $biddingType;

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
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="tenders")
     * @ORM\JoinTable(name="tenders_categories",
     *     joinColumns={
     *         @ORM\JoinColumn(name="tender_id", referencedColumnName="id")
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
     * Set section
     *
     * @access public
     * @param string $section
     * @return Tender
     */
    public function setSection($section)
    {
        $this->section = $section;
        return $this;
    }

    /**
     * Get section
     *
     * @access public
     * @return string 
     */
    public function getSection()
    {
        return $this->section;
    }

    /**
     * Set title
     *
     * @access public
     * @param string $title
     * @return Tender
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
     * @return Tender
     */
    public function setSlug($slug = null)
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
     * Set reference
     *
     * @access public
     * @param string $reference
     * @return Tender
     */
    public function setReference($reference)
    {
        $this->reference = $reference;
        return $this;
    }

    /**
     * Get reference
     *
     * @access public
     * @return string 
     */
    public function getReference()
    {
        return $this->reference;
    }

    /**
     * Set fees
     *
     * @access public
     * @param float $fees
     * @return Tender
     */
    public function setFees($fees = null)
    {
        $this->fees = $fees;
        return $this;
    }

    /**
     * Get fees
     *
     * @access public
     * @return float 
     */
    public function getFees()
    {
        return $this->fees;
    }

    /**
     * Set description
     *
     * @access public
     * @param string $description
     * @return Tender
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
     * @return Tender
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
     * Set publishDate
     *
     * @access public
     * @param \DateTime $publishDate
     * @return Tender
     */
    public function setPublishDate(\DateTime $publishDate = null)
    {
        $this->publishDate = $publishDate;
        return $this;
    }

    /**
     * Get publishDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getPublishDate()
    {
        return $this->publishDate;
    }

    /**
     * Set deadline
     *
     * @access public
     * @param \DateTime $deadline
     * @return Tender
     */
    public function setDeadline(\DateTime $deadline = null)
    {
        $this->deadline = $deadline;
        return $this;
    }

    /**
     * Get deadline
     *
     * @access public
     * @return \DateTime 
     */
    public function getDeadline()
    {
        return $this->deadline;
    }

    /**
     * Set estimatedCost
     *
     * @access public
     * @param integer $estimatedCost
     * @return Tender
     */
    public function setEstimatedCost($estimatedCost = null)
    {
        $this->estimatedCost = $estimatedCost;
        return $this;
    }

    /**
     * Get estimatedCost
     *
     * @access public
     * @return integer 
     */
    public function getEstimatedCost()
    {
        return $this->estimatedCost;
    }

    /**
     * Set attachmentFiles
     *
     * @access public
     * @param string $attachmentFiles
     * @return Tender
     */
    public function setAttachmentFiles($attachmentFiles = null)
    {
        $this->attachmentFiles = $attachmentFiles;
        return $this;
    }

    /**
     * Get attachmentFiles
     *
     * @access public
     * @return string 
     */
    public function getAttachmentFiles()
    {
        return $this->attachmentFiles;
    }

    /**
     * Set source
     *
     * @access public
     * @param string $source
     * @return Tender
     */
    public function setSource($source = null)
    {
        $this->source = $source;
        return $this;
    }

    /**
     * Get source
     *
     * @access public
     * @return string 
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * Set validated
     *
     * @access public
     * @param boolean $validated
     * @return Tender
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
     * Set views
     *
     * @access public
     * @param integer $views
     * @return Tender
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
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Tender
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
     * @return Tender
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
     * Set buyer
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Buyer $buyer
     * @return Tender
     */
    public function setBuyer(Buyer $buyer = null)
    {
        $this->buyer = $buyer;
        return $this;
    }

    /**
     * Get buyer
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Buyer 
     */
    public function getBuyer()
    {
        return $this->buyer;
    }

    /**
     * Set supplier
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Supplier $supplier
     * @return Tender
     */
    public function setSupplier(Supplier $supplier = null)
    {
        $this->supplier = $supplier;
        return $this;
    }

    /**
     * Get supplier
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Supplier 
     */
    public function getSupplier()
    {
        return $this->supplier;
    }

    /**
     * Set region
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Region $region
     * @return Tender
     */
    public function setRegion(Region $region = null)
    {
        $this->region = $region;
        return $this;
    }

    /**
     * Get region
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Region 
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set country
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Country $country
     * @return Tender
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
     * Set sector
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Sector $sector
     * @return Tender
     */
    public function setSector(Sector $sector = null)
    {
        $this->sector = $sector;
        return $this;
    }

    /**
     * Get sector
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Sector 
     */
    public function getSector()
    {
        return $this->sector;
    }

    /**
     * Set tenderType
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\TenderType $tenderType
     * @return Tender
     */
    public function setTenderType(TenderType $tenderType = null)
    {
        $this->tenderType = $tenderType;
        return $this;
    }

    /**
     * Get tenderType
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\TenderType 
     */
    public function getTenderType()
    {
        return $this->tenderType;
    }

    /**
     * Set biddingType
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\BiddingType $biddingType
     * @return Tender
     */
    public function setBiddingType(BiddingType $biddingType = null)
    {
        $this->biddingType = $biddingType;
        return $this;
    }

    /**
     * Get biddingType
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\BiddingType 
     */
    public function getBiddingType()
    {
        return $this->biddingType;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return Tender
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
     * @return Tender
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
     * @return Tender
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
     * @return Tender
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
     * @return Tender
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
