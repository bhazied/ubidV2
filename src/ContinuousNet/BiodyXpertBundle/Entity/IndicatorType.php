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
 * Indicator Type Entity
 * 
 * Storing IndicatorTypes data to the database using Doctrine
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
 * @see        IndicatorType
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`indicator_type`", indexes={@ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class IndicatorType 
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
     * @ORM\Column(name="`name`", type="string", length=100, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`variables`", type="string", length=511, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $variables;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`history_variables`", type="string", length=511, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $historyVariables;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`units`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $units;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`chart_type`", type="string", length=15, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $chartType;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`color`", type="string", length=7, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $color;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`default_period`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $defaultPeriod;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`settings`", type="string", length=1023, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $settings;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_current_value`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showCurrentValue;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_current_percent`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showCurrentPercent;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_first_gap_value`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showFirstGapValue;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_first_gap_percent`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showFirstGapPercent;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_last_gap_value`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showLastGapValue;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`show_last_gap_percent`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $showLastGapPercent;

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
     * Set name
     *
     * @access public
     * @param string $name
     * @return IndicatorType
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
     * Set variables
     *
     * @access public
     * @param string $variables
     * @return IndicatorType
     */
    public function setVariables($variables)
    {
        $this->variables = $variables;
        return $this;
    }

    /**
     * Get variables
     *
     * @access public
     * @return string 
     */
    public function getVariables()
    {
        return $this->variables;
    }

    /**
     * Set historyVariables
     *
     * @access public
     * @param string $historyVariables
     * @return IndicatorType
     */
    public function setHistoryVariables($historyVariables = null)
    {
        $this->historyVariables = $historyVariables;
        return $this;
    }

    /**
     * Get historyVariables
     *
     * @access public
     * @return string 
     */
    public function getHistoryVariables()
    {
        return $this->historyVariables;
    }

    /**
     * Set units
     *
     * @access public
     * @param string $units
     * @return IndicatorType
     */
    public function setUnits($units = null)
    {
        $this->units = $units;
        return $this;
    }

    /**
     * Get units
     *
     * @access public
     * @return string 
     */
    public function getUnits()
    {
        return $this->units;
    }

    /**
     * Set chartType
     *
     * @access public
     * @param string $chartType
     * @return IndicatorType
     */
    public function setChartType($chartType)
    {
        $this->chartType = $chartType;
        return $this;
    }

    /**
     * Get chartType
     *
     * @access public
     * @return string 
     */
    public function getChartType()
    {
        return $this->chartType;
    }

    /**
     * Set color
     *
     * @access public
     * @param string $color
     * @return IndicatorType
     */
    public function setColor($color)
    {
        $this->color = $color;
        return $this;
    }

    /**
     * Get color
     *
     * @access public
     * @return string 
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set defaultPeriod
     *
     * @access public
     * @param string $defaultPeriod
     * @return IndicatorType
     */
    public function setDefaultPeriod($defaultPeriod = null)
    {
        $this->defaultPeriod = $defaultPeriod;
        return $this;
    }

    /**
     * Get defaultPeriod
     *
     * @access public
     * @return string 
     */
    public function getDefaultPeriod()
    {
        return $this->defaultPeriod;
    }

    /**
     * Set settings
     *
     * @access public
     * @param string $settings
     * @return IndicatorType
     */
    public function setSettings($settings = null)
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
     * Set showCurrentValue
     *
     * @access public
     * @param boolean $showCurrentValue
     * @return IndicatorType
     */
    public function setShowCurrentValue($showCurrentValue)
    {
        $this->showCurrentValue = $showCurrentValue;
        return $this;
    }

    /**
     * Get showCurrentValue
     *
     * @access public
     * @return boolean 
     */
    public function getShowCurrentValue()
    {
        return $this->showCurrentValue;
    }

    /**
     * Set showCurrentPercent
     *
     * @access public
     * @param boolean $showCurrentPercent
     * @return IndicatorType
     */
    public function setShowCurrentPercent($showCurrentPercent)
    {
        $this->showCurrentPercent = $showCurrentPercent;
        return $this;
    }

    /**
     * Get showCurrentPercent
     *
     * @access public
     * @return boolean 
     */
    public function getShowCurrentPercent()
    {
        return $this->showCurrentPercent;
    }

    /**
     * Set showFirstGapValue
     *
     * @access public
     * @param boolean $showFirstGapValue
     * @return IndicatorType
     */
    public function setShowFirstGapValue($showFirstGapValue)
    {
        $this->showFirstGapValue = $showFirstGapValue;
        return $this;
    }

    /**
     * Get showFirstGapValue
     *
     * @access public
     * @return boolean 
     */
    public function getShowFirstGapValue()
    {
        return $this->showFirstGapValue;
    }

    /**
     * Set showFirstGapPercent
     *
     * @access public
     * @param boolean $showFirstGapPercent
     * @return IndicatorType
     */
    public function setShowFirstGapPercent($showFirstGapPercent)
    {
        $this->showFirstGapPercent = $showFirstGapPercent;
        return $this;
    }

    /**
     * Get showFirstGapPercent
     *
     * @access public
     * @return boolean 
     */
    public function getShowFirstGapPercent()
    {
        return $this->showFirstGapPercent;
    }

    /**
     * Set showLastGapValue
     *
     * @access public
     * @param boolean $showLastGapValue
     * @return IndicatorType
     */
    public function setShowLastGapValue($showLastGapValue)
    {
        $this->showLastGapValue = $showLastGapValue;
        return $this;
    }

    /**
     * Get showLastGapValue
     *
     * @access public
     * @return boolean 
     */
    public function getShowLastGapValue()
    {
        return $this->showLastGapValue;
    }

    /**
     * Set showLastGapPercent
     *
     * @access public
     * @param boolean $showLastGapPercent
     * @return IndicatorType
     */
    public function setShowLastGapPercent($showLastGapPercent)
    {
        $this->showLastGapPercent = $showLastGapPercent;
        return $this;
    }

    /**
     * Get showLastGapPercent
     *
     * @access public
     * @return boolean 
     */
    public function getShowLastGapPercent()
    {
        return $this->showLastGapPercent;
    }

    /**
     * Set published
     *
     * @access public
     * @param boolean $published
     * @return IndicatorType
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
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return IndicatorType
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
     * @return IndicatorType
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
     * @return IndicatorType
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
     * @return IndicatorType
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
