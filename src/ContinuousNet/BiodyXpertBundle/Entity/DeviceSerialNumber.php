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
 * Device Serial Number Entity
 * 
 * Storing DeviceSerialNumbers data to the database using Doctrine
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
 * @see        DeviceSerialNumber
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`device_serial_number`", indexes={@ORM\Index(name="licence_id", columns={"licence_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("serialNumber")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class DeviceSerialNumber 
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
     * @ORM\Column(name="`serial_number`", type="string", length=255, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    private $serialNumber;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Licence
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Licence")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="licence_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $licence;

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
     * @ORM\ManyToMany(targetEntity="User")
     * @ORM\JoinTable(name="device_serial_numbers_users",
     *     joinColumns={
     *         @ORM\JoinColumn(name="device_serial_number_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $users;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->users = new DoctrineCollection();
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
     * Set serialNumber
     *
     * @access public
     * @param string $serialNumber
     * @return DeviceSerialNumber
     */
    public function setSerialNumber($serialNumber)
    {
        $this->serialNumber = $serialNumber;
        return $this;
    }

    /**
     * Get serialNumber
     *
     * @access public
     * @return string 
     */
    public function getSerialNumber()
    {
        return $this->serialNumber;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return DeviceSerialNumber
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
     * @return DeviceSerialNumber
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
     * Set licence
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Licence $licence
     * @return DeviceSerialNumber
     */
    public function setLicence(Licence $licence = null)
    {
        $this->licence = $licence;
        return $this;
    }

    /**
     * Get licence
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Licence 
     */
    public function getLicence()
    {
        return $this->licence;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return DeviceSerialNumber
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
     * @return DeviceSerialNumber
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
     * Add user
     *
     * @access public
     * @param User $user
     * @return DeviceSerialNumber
     */
    public function addUser(User $user)
    {
        if (!$this->users->contains($user))
        {
            $this->users->add($user);
        }
        return $this;
    }

    /**
     * Remove user
     *
     * @access public
     * @param User $user
     * @return DeviceSerialNumber
     */
    public function removeUser(User $user)
    {
        if ($this->users->contains($user))
        {
            $this->users->removeElement($user);
        }
        return $this;
    }

    /**
     * Set user
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return DeviceSerialNumber
     */
    public function setUsers($users)
    {
        $this->users = $users;
        return $this;
    }

    /**
     * Get user
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
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
