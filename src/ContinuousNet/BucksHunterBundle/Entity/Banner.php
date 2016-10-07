<?php

namespace ContinuousNet\BucksHunterBundle\Entity;

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
 * Banner Entity
 * 
 * Storing Banners data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\BucksHunterBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://buckshunter.continuousnet.com/ContinuousNet/BucksHunterBundle/Entity
 * @see        Banner
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`banner`", indexes={@ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Banner 
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
     * @ORM\Column(name="type", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $type;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="name", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="brought_by_text", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $broughtByText;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="brought_by_picture", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $broughtByPicture;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="text", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $text;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="picture", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $picture;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="url", type="string", length=512, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $url;

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
     * @var \ContinuousNet\BucksHunterBundle\Entity\Country
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
     * @var \ContinuousNet\BucksHunterBundle\Entity\User
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
     * @var \ContinuousNet\BucksHunterBundle\Entity\User
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
     * Set type
     *
     * @access public
     * @param string $type
     * @return Banner
     */
    public function setType($type)
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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Banner
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
     * Set broughtByText
     *
     * @access public
     * @param string $broughtByText
     * @return Banner
     */
    public function setBroughtByText($broughtByText = null)
    {
        $this->broughtByText = $broughtByText;
        return $this;
    }

    /**
     * Get broughtByText
     *
     * @access public
     * @return string 
     */
    public function getBroughtByText()
    {
        return $this->broughtByText;
    }

    /**
     * Set broughtByPicture
     *
     * @access public
     * @param string $broughtByPicture
     * @return Banner
     */
    public function setBroughtByPicture($broughtByPicture = null)
    {
        $this->broughtByPicture = $broughtByPicture;
        return $this;
    }

    /**
     * Get broughtByPicture
     *
     * @access public
     * @return string 
     */
    public function getBroughtByPicture()
    {
        return $this->broughtByPicture;
    }

    /**
     * Set text
     *
     * @access public
     * @param string $text
     * @return Banner
     */
    public function setText($text = null)
    {
        $this->text = $text;
        return $this;
    }

    /**
     * Get text
     *
     * @access public
     * @return string 
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Banner
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
     * Set url
     *
     * @access public
     * @param string $url
     * @return Banner
     */
    public function setUrl($url = null)
    {
        $this->url = $url;
        return $this;
    }

    /**
     * Get url
     *
     * @access public
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Banner
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
     * @return Banner
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
     * @return Banner
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
     * @param \ContinuousNet\BucksHunterBundle\Entity\Country $country
     * @return Banner
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
     * @return \ContinuousNet\BucksHunterBundle\Entity\Country 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $creatorUser
     * @return Banner
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
     * @return \ContinuousNet\BucksHunterBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $modifierUser
     * @return Banner
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
     * @return \ContinuousNet\BucksHunterBundle\Entity\User 
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
