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
 * Push Notification Entity
 * 
 * Storing PushNotifications data to the database using Doctrine
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
 * @see        PushNotification
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`push_notification`", indexes={@ORM\Index(name="game_id", columns={"game_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class PushNotification 
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
     * @ORM\Column(name="title", type="string", length=255, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $title;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="message", type="string", length=500, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $message;

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
     * @ORM\Column(name="category", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $category;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="badge", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $badge;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="sound", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $sound;

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
     * @var \ContinuousNet\BucksHunterBundle\Entity\Game
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Game")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="game_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $game;

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
     * Set title
     *
     * @access public
     * @param string $title
     * @return PushNotification
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
     * Set message
     *
     * @access public
     * @param string $message
     * @return PushNotification
     */
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    /**
     * Get message
     *
     * @access public
     * @return string 
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set type
     *
     * @access public
     * @param string $type
     * @return PushNotification
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
     * Set category
     *
     * @access public
     * @param string $category
     * @return PushNotification
     */
    public function setCategory($category = null)
    {
        $this->category = $category;
        return $this;
    }

    /**
     * Get category
     *
     * @access public
     * @return string 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set badge
     *
     * @access public
     * @param integer $badge
     * @return PushNotification
     */
    public function setBadge($badge = null)
    {
        $this->badge = $badge;
        return $this;
    }

    /**
     * Get badge
     *
     * @access public
     * @return integer 
     */
    public function getBadge()
    {
        return $this->badge;
    }

    /**
     * Set sound
     *
     * @access public
     * @param string $sound
     * @return PushNotification
     */
    public function setSound($sound = null)
    {
        $this->sound = $sound;
        return $this;
    }

    /**
     * Get sound
     *
     * @access public
     * @return string 
     */
    public function getSound()
    {
        return $this->sound;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return PushNotification
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
     * @return PushNotification
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
     * Set game
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\Game $game
     * @return PushNotification
     */
    public function setGame(Game $game = null)
    {
        $this->game = $game;
        return $this;
    }

    /**
     * Get game
     *
     * @access public
     * @return \ContinuousNet\BucksHunterBundle\Entity\Game 
     */
    public function getGame()
    {
        return $this->game;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $creatorUser
     * @return PushNotification
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
     * @return PushNotification
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
