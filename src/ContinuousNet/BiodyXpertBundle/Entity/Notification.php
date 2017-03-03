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
 * Notification Entity
 * 
 * Storing Notifications data to the database using Doctrine
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
 * @see        Notification
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`notification`", indexes={@ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Notification 
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
     * @ORM\Column(name="`section`", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $section;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`controller`", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $controller;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`action`", type="string", length=50, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $action;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`primary_key`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $primaryKey;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`read`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $read;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`from_such_time`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $fromSuchTime;

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
     * Set section
     *
     * @access public
     * @param string $section
     * @return Notification
     */
    public function setSection($section = null)
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
     * Set controller
     *
     * @access public
     * @param string $controller
     * @return Notification
     */
    public function setController($controller = null)
    {
        $this->controller = $controller;
        return $this;
    }

    /**
     * Get controller
     *
     * @access public
     * @return string 
     */
    public function getController()
    {
        return $this->controller;
    }

    /**
     * Set action
     *
     * @access public
     * @param string $action
     * @return Notification
     */
    public function setAction($action = null)
    {
        $this->action = $action;
        return $this;
    }

    /**
     * Get action
     *
     * @access public
     * @return string 
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Set primaryKey
     *
     * @access public
     * @param integer $primaryKey
     * @return Notification
     */
    public function setPrimaryKey($primaryKey = null)
    {
        $this->primaryKey = $primaryKey;
        return $this;
    }

    /**
     * Get primaryKey
     *
     * @access public
     * @return integer 
     */
    public function getPrimaryKey()
    {
        return $this->primaryKey;
    }

    /**
     * Set read
     *
     * @access public
     * @param boolean $read
     * @return Notification
     */
    public function setRead($read)
    {
        $this->read = $read;
        return $this;
    }

    /**
     * Get read
     *
     * @access public
     * @return boolean 
     */
    public function getRead()
    {
        return $this->read;
    }

    /**
     * Set fromSuchTime
     *
     * @access public
     * @param \DateTime $fromSuchTime
     * @return Notification
     */
    public function setFromSuchTime(\DateTime $fromSuchTime = null)
    {
        $this->fromSuchTime = $fromSuchTime;
        return $this;
    }

    /**
     * Get fromSuchTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getFromSuchTime()
    {
        return $this->fromSuchTime;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Notification
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
     * @return Notification
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
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Notification
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
     * @return Notification
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
