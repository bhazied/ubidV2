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
 * Game Entity
 * 
 * Storing Games data to the database using Doctrine
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
 * @see        Game
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`game`", indexes={@ORM\Index(name="player_1_user_id", columns={"player_1_user_id"}), @ORM\Index(name="player_2_user_id", columns={"player_2_user_id"}), @ORM\Index(name="puzzle_id", columns={"puzzle_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Game 
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
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="preferred", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $preferred;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="level", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $level;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_1_download_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player1DownloadTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_2_download_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player2DownloadTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_1_start_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player1StartTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_2_start_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player2StartTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_1_end_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player1EndTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="player_2_end_time", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player2EndTime;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="player_1_app_time", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player1AppTime;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="player_2_app_time", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $player2AppTime;

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
     * @var \ContinuousNet\BucksHunterBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="player_1_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $player1User;

    /**
     * @var \ContinuousNet\BucksHunterBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="player_2_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $player2User;

    /**
     * @var \ContinuousNet\BucksHunterBundle\Entity\Puzzle
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Puzzle")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="puzzle_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $puzzle;

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
     * Set preferred
     *
     * @access public
     * @param boolean $preferred
     * @return Game
     */
    public function setPreferred($preferred = null)
    {
        $this->preferred = $preferred;
        return $this;
    }

    /**
     * Get preferred
     *
     * @access public
     * @return boolean 
     */
    public function getPreferred()
    {
        return $this->preferred;
    }

    /**
     * Set level
     *
     * @access public
     * @param integer $level
     * @return Game
     */
    public function setLevel($level)
    {
        $this->level = $level;
        return $this;
    }

    /**
     * Get level
     *
     * @access public
     * @return integer 
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set player1DownloadTime
     *
     * @access public
     * @param \DateTime $player1DownloadTime
     * @return Game
     */
    public function setPlayer1DownloadTime(\DateTime $player1DownloadTime = null)
    {
        $this->player1DownloadTime = $player1DownloadTime;
        return $this;
    }

    /**
     * Get player1DownloadTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer1DownloadTime()
    {
        return $this->player1DownloadTime;
    }

    /**
     * Set player2DownloadTime
     *
     * @access public
     * @param \DateTime $player2DownloadTime
     * @return Game
     */
    public function setPlayer2DownloadTime(\DateTime $player2DownloadTime = null)
    {
        $this->player2DownloadTime = $player2DownloadTime;
        return $this;
    }

    /**
     * Get player2DownloadTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer2DownloadTime()
    {
        return $this->player2DownloadTime;
    }

    /**
     * Set player1StartTime
     *
     * @access public
     * @param \DateTime $player1StartTime
     * @return Game
     */
    public function setPlayer1StartTime(\DateTime $player1StartTime = null)
    {
        $this->player1StartTime = $player1StartTime;
        return $this;
    }

    /**
     * Get player1StartTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer1StartTime()
    {
        return $this->player1StartTime;
    }

    /**
     * Set player2StartTime
     *
     * @access public
     * @param \DateTime $player2StartTime
     * @return Game
     */
    public function setPlayer2StartTime(\DateTime $player2StartTime = null)
    {
        $this->player2StartTime = $player2StartTime;
        return $this;
    }

    /**
     * Get player2StartTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer2StartTime()
    {
        return $this->player2StartTime;
    }

    /**
     * Set player1EndTime
     *
     * @access public
     * @param \DateTime $player1EndTime
     * @return Game
     */
    public function setPlayer1EndTime(\DateTime $player1EndTime = null)
    {
        $this->player1EndTime = $player1EndTime;
        return $this;
    }

    /**
     * Get player1EndTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer1EndTime()
    {
        return $this->player1EndTime;
    }

    /**
     * Set player2EndTime
     *
     * @access public
     * @param \DateTime $player2EndTime
     * @return Game
     */
    public function setPlayer2EndTime(\DateTime $player2EndTime = null)
    {
        $this->player2EndTime = $player2EndTime;
        return $this;
    }

    /**
     * Get player2EndTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getPlayer2EndTime()
    {
        return $this->player2EndTime;
    }

    /**
     * Set player1AppTime
     *
     * @access public
     * @param integer $player1AppTime
     * @return Game
     */
    public function setPlayer1AppTime($player1AppTime = null)
    {
        $this->player1AppTime = $player1AppTime;
        return $this;
    }

    /**
     * Get player1AppTime
     *
     * @access public
     * @return integer 
     */
    public function getPlayer1AppTime()
    {
        return $this->player1AppTime;
    }

    /**
     * Set player2AppTime
     *
     * @access public
     * @param integer $player2AppTime
     * @return Game
     */
    public function setPlayer2AppTime($player2AppTime = null)
    {
        $this->player2AppTime = $player2AppTime;
        return $this;
    }

    /**
     * Get player2AppTime
     *
     * @access public
     * @return integer 
     */
    public function getPlayer2AppTime()
    {
        return $this->player2AppTime;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Game
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
     * @return Game
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
     * @return Game
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
     * Set player1User
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $player1User
     * @return Game
     */
    public function setPlayer1User(User $player1User = null)
    {
        $this->player1User = $player1User;
        return $this;
    }

    /**
     * Get player1User
     *
     * @access public
     * @return \ContinuousNet\BucksHunterBundle\Entity\User 
     */
    public function getPlayer1User()
    {
        return $this->player1User;
    }

    /**
     * Set player2User
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $player2User
     * @return Game
     */
    public function setPlayer2User(User $player2User = null)
    {
        $this->player2User = $player2User;
        return $this;
    }

    /**
     * Get player2User
     *
     * @access public
     * @return \ContinuousNet\BucksHunterBundle\Entity\User 
     */
    public function getPlayer2User()
    {
        return $this->player2User;
    }

    /**
     * Set puzzle
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\Puzzle $puzzle
     * @return Game
     */
    public function setPuzzle(Puzzle $puzzle = null)
    {
        $this->puzzle = $puzzle;
        return $this;
    }

    /**
     * Get puzzle
     *
     * @access public
     * @return \ContinuousNet\BucksHunterBundle\Entity\Puzzle 
     */
    public function getPuzzle()
    {
        return $this->puzzle;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BucksHunterBundle\Entity\User $creatorUser
     * @return Game
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
     * @return Game
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
