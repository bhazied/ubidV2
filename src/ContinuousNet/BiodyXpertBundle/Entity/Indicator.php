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
 * Indicator Entity
 * 
 * Storing Indicators data to the database using Doctrine
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
 * @see        Indicator
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`indicator`", indexes={@ORM\Index(name="template_id", columns={"template_id"}), @ORM\Index(name="indicator_type_id", columns={"indicator_type_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Indicator 
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
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`published`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $published;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`column_number`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $columnNumber;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`row_number`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $rowNumber;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`period`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $period;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`settings`", type="string", length=1023, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $settings;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Template
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Template")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="template_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $template;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\IndicatorType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="IndicatorType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="indicator_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $indicatorType;

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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Indicator
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
     * Set published
     *
     * @access public
     * @param boolean $published
     * @return Indicator
     */
    public function setPublished($published)
    {
        $this->published = $published;
        return $this;
    }

    /**
     * Get published
     *
     * @access public
     * @return boolean 
     */
    public function getPublished()
    {
        return $this->published;
    }

    /**
     * Set columnNumber
     *
     * @access public
     * @param integer $columnNumber
     * @return Indicator
     */
    public function setColumnNumber($columnNumber)
    {
        $this->columnNumber = $columnNumber;
        return $this;
    }

    /**
     * Get columnNumber
     *
     * @access public
     * @return integer 
     */
    public function getColumnNumber()
    {
        return $this->columnNumber;
    }

    /**
     * Set rowNumber
     *
     * @access public
     * @param integer $rowNumber
     * @return Indicator
     */
    public function setRowNumber($rowNumber)
    {
        $this->rowNumber = $rowNumber;
        return $this;
    }

    /**
     * Get rowNumber
     *
     * @access public
     * @return integer 
     */
    public function getRowNumber()
    {
        return $this->rowNumber;
    }

    /**
     * Set period
     *
     * @access public
     * @param string $period
     * @return Indicator
     */
    public function setPeriod($period = null)
    {
        $this->period = $period;
        return $this;
    }

    /**
     * Get period
     *
     * @access public
     * @return string 
     */
    public function getPeriod()
    {
        return $this->period;
    }

    /**
     * Set settings
     *
     * @access public
     * @param string $settings
     * @return Indicator
     */
    public function setSettings($settings)
    {
        $this->settings = $settings;
        return $this;
    }

    /**
     * Get settings
     *
     * @access public
     * @return string 
     */
    public function getSettings()
    {
        return $this->settings;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Indicator
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
     * @return Indicator
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
     * Set template
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Template $template
     * @return Indicator
     */
    public function setTemplate(Template $template = null)
    {
        $this->template = $template;
        return $this;
    }

    /**
     * Get template
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Template 
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * Set indicatorType
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\IndicatorType $indicatorType
     * @return Indicator
     */
    public function setIndicatorType(IndicatorType $indicatorType = null)
    {
        $this->indicatorType = $indicatorType;
        return $this;
    }

    /**
     * Get indicatorType
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\IndicatorType 
     */
    public function getIndicatorType()
    {
        return $this->indicatorType;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Indicator
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
     * @return Indicator
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
