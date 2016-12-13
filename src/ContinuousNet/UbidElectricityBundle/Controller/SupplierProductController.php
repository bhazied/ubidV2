<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\SupplierProduct;
use ContinuousNet\UbidElectricityBundle\Form\SupplierProductType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Supplier Product Controller
 * 
 * Manage SupplierProducts 
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
 * @see		SupplierProductController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/supplierproduct")
 */
class SupplierProductController extends BaseController
{
	/**
	 * Lists all SupplierProduct entities.
	 *
	 * @Route("/", name="supplierproduct_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$supplierProducts = $em->getRepository('UbidElectricityBundle:SupplierProduct')->findAll();

		return $this->render('UbidElectricityBundle:SupplierProduct:index.html.twig', array(
			'supplierProducts' => $supplierProducts,
		));
	}

	/**
	 * Creates a new SupplierProduct entity.
	 *
	 * @Route("/new", name="supplierproduct_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$supplierProduct = new SupplierProduct();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierProductType', $supplierProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplierProduct);
			$em->flush();

			return $this->redirectToRoute('supplierproduct_show', array('id' => $supplierProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:SupplierProduct:new.html.twig', array(
			'supplierProduct' => $supplierProduct,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a SupplierProduct entity.
	 *
	 * @Route("/{id}", name="supplierproduct_show")
	 * @Method("GET")
	 */
	public function showAction(SupplierProduct $supplierProduct)
	{
		$deleteForm = $this->createDeleteForm($supplierProduct);

		return $this->render('UbidElectricityBundle:SupplierProduct:show.html.twig', array(
			'supplierProduct' => $supplierProduct,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing SupplierProduct entity.
	 *
	 * @Route("/{id}/edit", name="supplierproduct_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, SupplierProduct $supplierProduct)
	{
		$deleteForm = $this->createDeleteForm($supplierProduct);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\SupplierProductType', $supplierProduct);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($supplierProduct);
			$em->flush();

			return $this->redirectToRoute('supplierproduct_edit', array('id' => $supplierProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:SupplierProduct:edit.html.twig', array(
			'supplierProduct' => $supplierProduct,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a SupplierProduct entity.
	 *
	 * @Route("/{id}", name="supplierproduct_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, SupplierProduct $supplierProduct)
	{
		$form = $this->createDeleteForm($supplierProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($supplierProduct);
			$em->flush();
		}

		return $this->redirectToRoute('supplierproduct_index');
	}

	/**
	 * Creates a form to delete a SupplierProduct entity.
	 *
	 * @param SupplierProduct $supplierProduct The SupplierProduct entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(SupplierProduct $supplierProduct)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('supplierproduct_delete', array('id' => $supplierProduct->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
