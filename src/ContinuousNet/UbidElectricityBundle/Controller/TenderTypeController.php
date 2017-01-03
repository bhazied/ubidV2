<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderType;
use ContinuousNet\UbidElectricityBundle\Form\TenderTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Tender Type Controller
 * 
 * Manage TenderTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TenderTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/tendertype")
 */
class TenderTypeController extends BaseController
{
	/**
	 * Lists all TenderType entities.
	 *
	 * @Route("/", name="tendertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$tenderTypes = $em->getRepository('UbidElectricityBundle:TenderType')->findAll();

		return $this->render('UbidElectricityBundle:TenderType:index.html.twig', array(
			'tenderTypes' => $tenderTypes,
		));
	}

	/**
	 * Creates a new TenderType entity.
	 *
	 * @Route("/new", name="tendertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$tenderType = new TenderType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderTypeType', $tenderType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderType);
			$em->flush();

			return $this->redirectToRoute('tendertype_show', array('id' => $tenderType->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderType:new.html.twig', array(
			'tenderType' => $tenderType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TenderType entity.
	 *
	 * @Route("/{id}", name="tendertype_show")
	 * @Method("GET")
	 */
	public function showAction(TenderType $tenderType)
	{
		$deleteForm = $this->createDeleteForm($tenderType);

		return $this->render('UbidElectricityBundle:TenderType:show.html.twig', array(
			'tenderType' => $tenderType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TenderType entity.
	 *
	 * @Route("/{id}/edit", name="tendertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TenderType $tenderType)
	{
		$deleteForm = $this->createDeleteForm($tenderType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderTypeType', $tenderType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderType);
			$em->flush();

			return $this->redirectToRoute('tendertype_edit', array('id' => $tenderType->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderType:edit.html.twig', array(
			'tenderType' => $tenderType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TenderType entity.
	 *
	 * @Route("/{id}", name="tendertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TenderType $tenderType)
	{
		$form = $this->createDeleteForm($tenderType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($tenderType);
			$em->flush();
		}

		return $this->redirectToRoute('tendertype_index');
	}

	/**
	 * Creates a form to delete a TenderType entity.
	 *
	 * @param TenderType $tenderType The TenderType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TenderType $tenderType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('tendertype_delete', array('id' => $tenderType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
