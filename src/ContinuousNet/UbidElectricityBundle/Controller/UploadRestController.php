<?php
namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderCategory;
use ContinuousNet\UbidElectricityBundle\Entity\Tender;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View AS FOSView;
use FOS\UserBundle\Model\UserManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use ContinuousNet\UbidElectricityBundle\EventListener\UserSessionData;

/**
* Public Api V1 REST Controller
*
* Manage Api V1
*
* PHP version 5.4.4
*
* @category   Symfony 2 REST Controller
* @package  ContinuousNet\UbidElectricityBundle\Controller
* @author    Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
* @copyright  2016 CONTINUOUS NET
* @license  CONTINUOUS NET REGULAR LICENSE
* @version  Release: 1.0
* @link    http://ubid-electricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
* @see      ApiV1RESTController
* @since      Class available since Release 1.0
* @deprecated Nothing
* @access    public
*/
class UploadESTController extends FOSRestController
{
    /**
     * @Post("/upload")
     * @View(serializerEnableMaxDepthChecks=true)
     */

    public function uploadAction(Request $request){
        try{
            return $this->view(null, 400);
        }
        catch (\Exception $e){
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
?>