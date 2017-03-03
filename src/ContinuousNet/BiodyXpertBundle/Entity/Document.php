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
 * Document Entity
 * 
 * Storing Documents data to the database using Doctrine
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
 * @see        Document
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`document`", indexes={@ORM\Index(name="document_type_id", columns={"document_type_id"}), @ORM\Index(name="author_id", columns={"author_id"}), @ORM\Index(name="collection_id", columns={"collection_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Document 
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
     * @ORM\Column(name="`description`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`pages`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $pages;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`remote_source`", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $remoteSource;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`file`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $file;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`copyright`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $copyright;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_top`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isTop;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_new`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isNew;

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
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_previewed`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalPreviewed;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_downloads`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalDownloads;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_hits`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalHits;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_comments`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalComments;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_ratings`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalRatings;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`average_ratings`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $averageRatings;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_likes`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalLikes;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`total_dislikes`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $totalDislikes;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`toal_bookmarks`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $toalBookmarks;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`auto_publishing`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $autoPublishing;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`start_publishing`", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $startPublishing;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`end_publishing`", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $endPublishing;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\DocumentType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="DocumentType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="document_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $documentType;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Author
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Author")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="author_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $author;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Collection
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Collection")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="collection_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $collection;

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
     * @ORM\ManyToMany(targetEntity="DocumentCategory")
     * @ORM\JoinTable(name="documents_document_categories",
     *     joinColumns={
     *         @ORM\JoinColumn(name="document_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="document_category_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $documentCategories;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->documentCategories = new DoctrineCollection();
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
     * @return Document
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
     * @return Document
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
     * @return Document
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
     * Set pages
     *
     * @access public
     * @param integer $pages
     * @return Document
     */
    public function setPages($pages = null)
    {
        $this->pages = $pages;
        return $this;
    }

    /**
     * Get pages
     *
     * @access public
     * @return integer 
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * Set remoteSource
     *
     * @access public
     * @param boolean $remoteSource
     * @return Document
     */
    public function setRemoteSource($remoteSource = null)
    {
        $this->remoteSource = $remoteSource;
        return $this;
    }

    /**
     * Get remoteSource
     *
     * @access public
     * @return boolean 
     */
    public function getRemoteSource()
    {
        return $this->remoteSource;
    }

    /**
     * Set file
     *
     * @access public
     * @param string $file
     * @return Document
     */
    public function setFile($file = null)
    {
        $this->file = $file;
        return $this;
    }

    /**
     * Get file
     *
     * @access public
     * @return string 
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set copyright
     *
     * @access public
     * @param string $copyright
     * @return Document
     */
    public function setCopyright($copyright = null)
    {
        $this->copyright = $copyright;
        return $this;
    }

    /**
     * Get copyright
     *
     * @access public
     * @return string 
     */
    public function getCopyright()
    {
        return $this->copyright;
    }

    /**
     * Set isTop
     *
     * @access public
     * @param boolean $isTop
     * @return Document
     */
    public function setIsTop($isTop)
    {
        $this->isTop = $isTop;
        return $this;
    }

    /**
     * Get isTop
     *
     * @access public
     * @return boolean 
     */
    public function getIsTop()
    {
        return $this->isTop;
    }

    /**
     * Set isNew
     *
     * @access public
     * @param boolean $isNew
     * @return Document
     */
    public function setIsNew($isNew)
    {
        $this->isNew = $isNew;
        return $this;
    }

    /**
     * Get isNew
     *
     * @access public
     * @return boolean 
     */
    public function getIsNew()
    {
        return $this->isNew;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Document
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
     * Set totalPreviewed
     *
     * @access public
     * @param integer $totalPreviewed
     * @return Document
     */
    public function setTotalPreviewed($totalPreviewed = null)
    {
        $this->totalPreviewed = $totalPreviewed;
        return $this;
    }

    /**
     * Get totalPreviewed
     *
     * @access public
     * @return integer 
     */
    public function getTotalPreviewed()
    {
        return $this->totalPreviewed;
    }

    /**
     * Set totalDownloads
     *
     * @access public
     * @param integer $totalDownloads
     * @return Document
     */
    public function setTotalDownloads($totalDownloads = null)
    {
        $this->totalDownloads = $totalDownloads;
        return $this;
    }

    /**
     * Get totalDownloads
     *
     * @access public
     * @return integer 
     */
    public function getTotalDownloads()
    {
        return $this->totalDownloads;
    }

    /**
     * Set totalHits
     *
     * @access public
     * @param integer $totalHits
     * @return Document
     */
    public function setTotalHits($totalHits = null)
    {
        $this->totalHits = $totalHits;
        return $this;
    }

    /**
     * Get totalHits
     *
     * @access public
     * @return integer 
     */
    public function getTotalHits()
    {
        return $this->totalHits;
    }

    /**
     * Set totalComments
     *
     * @access public
     * @param integer $totalComments
     * @return Document
     */
    public function setTotalComments($totalComments = null)
    {
        $this->totalComments = $totalComments;
        return $this;
    }

    /**
     * Get totalComments
     *
     * @access public
     * @return integer 
     */
    public function getTotalComments()
    {
        return $this->totalComments;
    }

    /**
     * Set totalRatings
     *
     * @access public
     * @param integer $totalRatings
     * @return Document
     */
    public function setTotalRatings($totalRatings = null)
    {
        $this->totalRatings = $totalRatings;
        return $this;
    }

    /**
     * Get totalRatings
     *
     * @access public
     * @return integer 
     */
    public function getTotalRatings()
    {
        return $this->totalRatings;
    }

    /**
     * Set averageRatings
     *
     * @access public
     * @param float $averageRatings
     * @return Document
     */
    public function setAverageRatings($averageRatings = null)
    {
        $this->averageRatings = $averageRatings;
        return $this;
    }

    /**
     * Get averageRatings
     *
     * @access public
     * @return float 
     */
    public function getAverageRatings()
    {
        return $this->averageRatings;
    }

    /**
     * Set totalLikes
     *
     * @access public
     * @param integer $totalLikes
     * @return Document
     */
    public function setTotalLikes($totalLikes = null)
    {
        $this->totalLikes = $totalLikes;
        return $this;
    }

    /**
     * Get totalLikes
     *
     * @access public
     * @return integer 
     */
    public function getTotalLikes()
    {
        return $this->totalLikes;
    }

    /**
     * Set totalDislikes
     *
     * @access public
     * @param integer $totalDislikes
     * @return Document
     */
    public function setTotalDislikes($totalDislikes = null)
    {
        $this->totalDislikes = $totalDislikes;
        return $this;
    }

    /**
     * Get totalDislikes
     *
     * @access public
     * @return integer 
     */
    public function getTotalDislikes()
    {
        return $this->totalDislikes;
    }

    /**
     * Set toalBookmarks
     *
     * @access public
     * @param integer $toalBookmarks
     * @return Document
     */
    public function setToalBookmarks($toalBookmarks = null)
    {
        $this->toalBookmarks = $toalBookmarks;
        return $this;
    }

    /**
     * Get toalBookmarks
     *
     * @access public
     * @return integer 
     */
    public function getToalBookmarks()
    {
        return $this->toalBookmarks;
    }

    /**
     * Set autoPublishing
     *
     * @access public
     * @param boolean $autoPublishing
     * @return Document
     */
    public function setAutoPublishing($autoPublishing)
    {
        $this->autoPublishing = $autoPublishing;
        return $this;
    }

    /**
     * Get autoPublishing
     *
     * @access public
     * @return boolean 
     */
    public function getAutoPublishing()
    {
        return $this->autoPublishing;
    }

    /**
     * Set startPublishing
     *
     * @access public
     * @param \DateTime $startPublishing
     * @return Document
     */
    public function setStartPublishing(\DateTime $startPublishing)
    {
        $this->startPublishing = $startPublishing;
        return $this;
    }

    /**
     * Get startPublishing
     *
     * @access public
     * @return \DateTime 
     */
    public function getStartPublishing()
    {
        return $this->startPublishing;
    }

    /**
     * Set endPublishing
     *
     * @access public
     * @param \DateTime $endPublishing
     * @return Document
     */
    public function setEndPublishing(\DateTime $endPublishing)
    {
        $this->endPublishing = $endPublishing;
        return $this;
    }

    /**
     * Get endPublishing
     *
     * @access public
     * @return \DateTime 
     */
    public function getEndPublishing()
    {
        return $this->endPublishing;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Document
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
     * @return Document
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
     * Set documentType
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\DocumentType $documentType
     * @return Document
     */
    public function setDocumentType(DocumentType $documentType = null)
    {
        $this->documentType = $documentType;
        return $this;
    }

    /**
     * Get documentType
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\DocumentType 
     */
    public function getDocumentType()
    {
        return $this->documentType;
    }

    /**
     * Set author
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Author $author
     * @return Document
     */
    public function setAuthor(Author $author = null)
    {
        $this->author = $author;
        return $this;
    }

    /**
     * Get author
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Author 
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set collection
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Collection $collection
     * @return Document
     */
    public function setCollection(Collection $collection = null)
    {
        $this->collection = $collection;
        return $this;
    }

    /**
     * Get collection
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Collection 
     */
    public function getCollection()
    {
        return $this->collection;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Document
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
     * @return Document
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
     * Add documentCategory
     *
     * @access public
     * @param DocumentCategory $documentCategory
     * @return Document
     */
    public function addDocumentCategory(DocumentCategory $documentCategory)
    {
        if (!$this->documentCategories->contains($documentCategory))
        {
            $this->documentCategories->add($documentCategory);
        }
        return $this;
    }

    /**
     * Remove documentCategory
     *
     * @access public
     * @param DocumentCategory $documentCategory
     * @return Document
     */
    public function removeDocumentCategory(DocumentCategory $documentCategory)
    {
        if ($this->documentCategories->contains($documentCategory))
        {
            $this->documentCategories->removeElement($documentCategory);
        }
        return $this;
    }

    /**
     * Set documentCategory
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return Document
     */
    public function setDocumentCategories($documentCategories)
    {
        $this->documentCategories = $documentCategories;
        return $this;
    }

    /**
     * Get documentCategory
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDocumentCategories()
    {
        return $this->documentCategories;
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
