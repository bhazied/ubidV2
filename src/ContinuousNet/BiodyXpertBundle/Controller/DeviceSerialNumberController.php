<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\DeviceSerialNumber;
use ContinuousNet\BiodyXpertBundle\Form\DeviceSerialNumberType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Device Serial Number Controller
 * 
 * Manage DeviceSerialNumbers 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		DeviceSerialNumberController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/deviceserialnumber")
 */
class DeviceSerialNumberController extends BaseController
{
	/**
	 * Lists all DeviceSerialNumber entities.
	 *
	 * @Route("/", name="deviceserialnumber_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$deviceSerialNumbers = $em->getRepository('BiodyXpertBundle:DeviceSerialNumber')->findAll();

		return $this->render('BiodyXpertBundle:DeviceSerialNumber:index.html.twig', array(
			'deviceSerialNumbers' => $deviceSerialNumbers,
		));
	}

	/**
	 * Creates a new DeviceSerialNumber entity.
	 *
	 * @Route("/new", name="deviceserialnumber_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$deviceSerialNumber = new DeviceSerialNumber();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DeviceSerialNumberType', $deviceSerialNumber);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($deviceSerialNumber);
			$em->flush();

			return $this->redirectToRoute('deviceserialnumber_show', array('id' => $deviceSerialNumber->getId()));
		}

		return $this->render('BiodyXpertBundle:DeviceSerialNumber:new.html.twig', array(
			'deviceSerialNumber' => $deviceSerialNumber,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a DeviceSerialNumber entity.
	 *
	 * @Route("/{id}", name="deviceserialnumber_show")
	 * @Method("GET")
	 */
	public function showAction(DeviceSerialNumber $deviceSerialNumber)
	{
		$deleteForm = $this->createDeleteForm($deviceSerialNumber);

		return $this->render('BiodyXpertBundle:DeviceSerialNumber:show.html.twig', array(
			'deviceSerialNumber' => $deviceSerialNumber,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing DeviceSerialNumber entity.
	 *
	 * @Route("/{id}/edit", name="deviceserialnumber_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, DeviceSerialNumber $deviceSerialNumber)
	{
		$deleteForm = $this->createDeleteForm($deviceSerialNumber);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\DeviceSerialNumberType', $deviceSerialNumber);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($deviceSerialNumber);
			$em->flush();

			return $this->redirectToRoute('deviceserialnumber_edit', array('id' => $deviceSerialNumber->getId()));
		}

		return $this->render('BiodyXpertBundle:DeviceSerialNumber:edit.html.twig', array(
			'deviceSerialNumber' => $deviceSerialNumber,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a DeviceSerialNumber entity.
	 *
	 * @Route("/{id}", name="deviceserialnumber_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, DeviceSerialNumber $deviceSerialNumber)
	{
		$form = $this->createDeleteForm($deviceSerialNumber);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($deviceSerialNumber);
			$em->flush();
		}

		return $this->redirectToRoute('deviceserialnumber_index');
	}

	/**
	 * Creates a form to delete a DeviceSerialNumber entity.
	 *
	 * @param DeviceSerialNumber $deviceSerialNumber The DeviceSerialNumber entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(DeviceSerialNumber $deviceSerialNumber)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('deviceserialnumber_delete', array('id' => $deviceSerialNumber->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
