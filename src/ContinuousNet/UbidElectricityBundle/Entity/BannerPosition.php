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
 * Banner Position Entity
 * 
 * Storing BannerPositions data to the database using Doctrine
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
 * @see        BannerPosition
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`banner_position`", indexes={@ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class BannerPosition 
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
     * @ORM\Column(name="`name`", type="string", length=100, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug`", type="string", length=50, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`items_number`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $itemsNumber;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`display_time`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $displayTime;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_full_screen`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isFullScreen;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`display_one_time`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $displayOneTime;

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
     * @var \Doctrine\Common\Collections\Collection
     * @access private
     *
     * @ORM\ManyToMany(targetEntity="Banner", inversedBy="bannerPositions")
     * @ORM\JoinTable(name="banners_banner_positions",
     *     joinColumns={
     *         @ORM\JoinColumn(name="`banner_position_id`", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="`banner_id`", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $banners;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->banners = new DoctrineCollection();
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
     * @return BannerPosition
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
     * @return BannerPosition
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
     * Set itemsNumber
     *
     * @access public
     * @param integer $itemsNumber
     * @return BannerPosition
     */
    public function setItemsNumber($itemsNumber)
    {
        $this->itemsNumber = $itemsNumber;
        return $this;
    }

    /**
     * Get itemsNumber
     *
     * @access public
     * @return integer 
     */
    public function getItemsNumber()
    {
        return $this->itemsNumber;
    }

    /**
     * Set displayTime
     *
     * @access public
     * @param integer $displayTime
     * @return BannerPosition
     */
    public function setDisplayTime($displayTime)
    {
        $this->displayTime = $displayTime;
        return $this;
    }

    /**
     * Get displayTime
     *
     * @access public
     * @return integer 
     */
    public function getDisplayTime()
    {
        return $this->displayTime;
    }

    /**
     * Set isFullScreen
     *
     * @access public
     * @param boolean $isFullScreen
     * @return BannerPosition
     */
    public function setIsFullScreen($isFullScreen)
    {
        $this->isFullScreen = $isFullScreen;
        return $this;
    }

    /**
     * Get isFullScreen
     *
     * @access public
     * @return boolean 
     */
    public function getIsFullScreen()
    {
        return $this->isFullScreen;
    }

    /**
     * Set displayOneTime
     *
     * @access public
     * @param boolean $displayOneTime
     * @return BannerPosition
     */
    public function setDisplayOneTime($displayOneTime)
    {
        $this->displayOneTime = $displayOneTime;
        return $this;
    }

    /**
     * Get displayOneTime
     *
     * @access public
     * @return boolean 
     */
    public function getDisplayOneTime()
    {
        return $this->displayOneTime;
    }

    /**
     * Set isPublished
     *
     * @access public
     * @param boolean $isPublished
     * @return BannerPosition
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
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return BannerPosition
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
     * @return BannerPosition
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
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return BannerPosition
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
     * @return BannerPosition
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
     * Add banner
     *
     * @access public
     * @param Banner $banner
     * @return BannerPosition
     */
    public function addBanner(Banner $banner)
    {
        if (!$this->banners->contains($banner))
        {
            $this->banners->add($banner);
        }
        return $this;
    }

    /**
     * Remove banner
     *
     * @access public
     * @param Banner $banner
     * @return BannerPosition
     */
    public function removeBanner(Banner $banner)
    {
        if ($this->banners->contains($banner))
        {
            $this->banners->removeElement($banner);
        }
        return $this;
    }

    /**
     * Set banner
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return BannerPosition
     */
    public function setBanners($banners)
    {
        $this->banners = $banners;
        return $this;
    }

    /**
     * Get banner
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBanners()
    {
        return $this->banners;
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
