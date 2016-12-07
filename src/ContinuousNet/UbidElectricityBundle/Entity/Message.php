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
 * Message Entity
 * 
 * Storing Messages data to the database using Doctrine
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
 * @see        Message
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`message`", indexes={@ORM\Index(name="from_user_id", columns={"from_user_id"}), @ORM\Index(name="from_buyer_id", columns={"from_buyer_id"}), @ORM\Index(name="from_supplier_id", columns={"from_supplier_id"}), @ORM\Index(name="to_user_id", columns={"to_user_id"}), @ORM\Index(name="to_buyer_id", columns={"to_buyer_id"}), @ORM\Index(name="to_supplier_id", columns={"to_supplier_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Message 
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
     * @ORM\Column(name="subject", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $subject;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="body", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $body;

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
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="is_read", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $isRead;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="sending_time", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $sendingTime;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="reading_time", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $readingTime;

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
     * @var \ContinuousNet\UbidElectricityBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="from_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $fromUser;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Buyer
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Buyer")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="from_buyer_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $fromBuyer;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Supplier
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Supplier")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="from_supplier_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $fromSupplier;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="to_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $toUser;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Buyer
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Buyer")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="to_buyer_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $toBuyer;

    /**
     * @var \ContinuousNet\UbidElectricityBundle\Entity\Supplier
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Supplier")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="to_supplier_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $toSupplier;

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
     * Set subject
     *
     * @access public
     * @param string $subject
     * @return Message
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;
        return $this;
    }

    /**
     * Get subject
     *
     * @access public
     * @return string 
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Set body
     *
     * @access public
     * @param string $body
     * @return Message
     */
    public function setBody($body = null)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * Get body
     *
     * @access public
     * @return string 
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Message
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
     * Set isRead
     *
     * @access public
     * @param boolean $isRead
     * @return Message
     */
    public function setIsRead($isRead = null)
    {
        $this->isRead = $isRead;
        return $this;
    }

    /**
     * Get isRead
     *
     * @access public
     * @return boolean 
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * Set sendingTime
     *
     * @access public
     * @param \DateTime $sendingTime
     * @return Message
     */
    public function setSendingTime(\DateTime $sendingTime)
    {
        $this->sendingTime = $sendingTime;
        return $this;
    }

    /**
     * Get sendingTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getSendingTime()
    {
        return $this->sendingTime;
    }

    /**
     * Set readingTime
     *
     * @access public
     * @param \DateTime $readingTime
     * @return Message
     */
    public function setReadingTime(\DateTime $readingTime)
    {
        $this->readingTime = $readingTime;
        return $this;
    }

    /**
     * Get readingTime
     *
     * @access public
     * @return \DateTime 
     */
    public function getReadingTime()
    {
        return $this->readingTime;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Message
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
     * @return Message
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
     * Set fromUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $fromUser
     * @return Message
     */
    public function setFromUser(User $fromUser = null)
    {
        $this->fromUser = $fromUser;
        return $this;
    }

    /**
     * Get fromUser
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\User 
     */
    public function getFromUser()
    {
        return $this->fromUser;
    }

    /**
     * Set fromBuyer
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Buyer $fromBuyer
     * @return Message
     */
    public function setFromBuyer(Buyer $fromBuyer = null)
    {
        $this->fromBuyer = $fromBuyer;
        return $this;
    }

    /**
     * Get fromBuyer
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Buyer 
     */
    public function getFromBuyer()
    {
        return $this->fromBuyer;
    }

    /**
     * Set fromSupplier
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Supplier $fromSupplier
     * @return Message
     */
    public function setFromSupplier(Supplier $fromSupplier = null)
    {
        $this->fromSupplier = $fromSupplier;
        return $this;
    }

    /**
     * Get fromSupplier
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Supplier 
     */
    public function getFromSupplier()
    {
        return $this->fromSupplier;
    }

    /**
     * Set toUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $toUser
     * @return Message
     */
    public function setToUser(User $toUser = null)
    {
        $this->toUser = $toUser;
        return $this;
    }

    /**
     * Get toUser
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\User 
     */
    public function getToUser()
    {
        return $this->toUser;
    }

    /**
     * Set toBuyer
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Buyer $toBuyer
     * @return Message
     */
    public function setToBuyer(Buyer $toBuyer = null)
    {
        $this->toBuyer = $toBuyer;
        return $this;
    }

    /**
     * Get toBuyer
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Buyer 
     */
    public function getToBuyer()
    {
        return $this->toBuyer;
    }

    /**
     * Set toSupplier
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\Supplier $toSupplier
     * @return Message
     */
    public function setToSupplier(Supplier $toSupplier = null)
    {
        $this->toSupplier = $toSupplier;
        return $this;
    }

    /**
     * Get toSupplier
     *
     * @access public
     * @return \ContinuousNet\UbidElectricityBundle\Entity\Supplier 
     */
    public function getToSupplier()
    {
        return $this->toSupplier;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\UbidElectricityBundle\Entity\User $creatorUser
     * @return Message
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
     * @return Message
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
