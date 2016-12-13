<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\SupplierType;
use ContinuousNet\UbidElectricityBundle\Form\SupplierTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Supplier Type Controller
 * 
 * Manage SupplierTypes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		SupplierTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/suppliertype")
 */
class SupplierTypeController extends BaseController
{
	/**
	 * Lists all SupplierType entities.
	 *
	 * @Route("/", name="suppliertype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$supplierTypes = $em->getRepository('UbidElectricityBundle:SupplierType')->findAll();

		return $this->render('UbidElectricityBundle:SupplierType:index.html.twig', array(
			'supplierTypes' => $supplierTypes,
		));
	}

	/**
	 * Creates a new SupplierType entity.
	 *
	 * @Route("/new", name="suppliertype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$supplierType = new SupplierType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierTypeType', $supplierType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplierType);
			$em->flush();

			return $this->redirectToRoute('suppliertype_show', array('id' => $supplierType->getId()));
		}

		return $this->render('UbidElectricityBundle:SupplierType:new.html.twig', array(
			'supplierType' => $supplierType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a SupplierType entity.
	 *
	 * @Route("/{id}", name="suppliertype_show")
	 * @Method("GET")
	 */
	public function showAction(SupplierType $supplierType)
	{
		$deleteForm = $this->createDeleteForm($supplierType);

		return $this->render('UbidElectricityBundle:SupplierType:show.html.twig', array(
			'supplierType' => $supplierType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing SupplierType entity.
	 *
	 * @Route("/{id}/edit", name="suppliertype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, SupplierType $supplierType)
	{
		$deleteForm = $this->createDeleteForm($supplierType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierTypeType', $supplierType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplierType);
			$em->flush();

			return $this->redirectToRoute('suppliertype_edit', array('id' => $supplierType->getId()));
		}

		return $this->render('UbidElectricityBundle:SupplierType:edit.html.twig', array(
			'supplierType' => $supplierType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a SupplierType entity.
	 *
	 * @Route("/{id}", name="suppliertype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, SupplierType $supplierType)
	{
		$form = $this->createDeleteForm($supplierType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($supplierType);
			$em->flush();
		}

		return $this->redirectToRoute('suppliertype_index');
	}

	/**
	 * Creates a form to delete a SupplierType entity.
	 *
	 * @param SupplierType $supplierType The SupplierType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(SupplierType $supplierType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('suppliertype_delete', array('id' => $supplierType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
