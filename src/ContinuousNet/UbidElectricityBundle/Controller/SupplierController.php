<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Supplier;
use ContinuousNet\UbidElectricityBundle\Form\SupplierType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Supplier Controller
 * 
 * Manage Suppliers 
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
 * @see		SupplierController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/supplier")
 */
class SupplierController extends BaseController
{
	/**
	 * Lists all Supplier entities.
	 *
	 * @Route("/", name="supplier_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$suppliers = $em->getRepository('UbidElectricityBundle:Supplier')->findAll();

		return $this->render('UbidElectricityBundle:Supplier:index.html.twig', array(
			'suppliers' => $suppliers,
		));
	}

	/**
	 * Creates a new Supplier entity.
	 *
	 * @Route("/new", name="supplier_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$supplier = new Supplier();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierType', $supplier);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplier);
			$em->flush();

			return $this->redirectToRoute('supplier_show', array('id' => $supplier->getId()));
		}

		return $this->render('UbidElectricityBundle:Supplier:new.html.twig', array(
			'supplier' => $supplier,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Supplier entity.
	 *
	 * @Route("/{id}", name="supplier_show")
	 * @Method("GET")
	 */
	public function showAction(Supplier $supplier)
	{
		$deleteForm = $this->createDeleteForm($supplier);

		return $this->render('UbidElectricityBundle:Supplier:show.html.twig', array(
			'supplier' => $supplier,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Supplier entity.
	 *
	 * @Route("/{id}/edit", name="supplier_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Supplier $supplier)
	{
		$deleteForm = $this->createDeleteForm($supplier);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierType', $supplier);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplier);
			$em->flush();

			return $this->redirectToRoute('supplier_edit', array('id' => $supplier->getId()));
		}

		return $this->render('UbidElectricityBundle:Supplier:edit.html.twig', array(
			'supplier' => $supplier,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Supplier entity.
	 *
	 * @Route("/{id}", name="supplier_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Supplier $supplier)
	{
		$form = $this->createDeleteForm($supplier);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($supplier);
			$em->flush();
		}

		return $this->redirectToRoute('supplier_index');
	}

	/**
	 * Creates a form to delete a Supplier entity.
	 *
	 * @param Supplier $supplier The Supplier entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Supplier $supplier)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('supplier_delete', array('id' => $supplier->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
