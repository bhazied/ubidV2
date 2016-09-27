<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\BidProduct;
use ContinuousNet\UbidElectricityBundle\Form\BidProductType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Bid Product Controller
 * 
 * Manage BidProducts 
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
 * @see		BidProductController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/bidproduct")
 */
class BidProductController extends BaseController
{
	/**
	 * Lists all BidProduct entities.
	 *
	 * @Route("/", name="bidproduct_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$bidProducts = $em->getRepository('UbidElectricityBundle:BidProduct')->findAll();

		return $this->render('UbidElectricityBundle:BidProduct:index.html.twig', array(
			'bidProducts' => $bidProducts,
		));
	}

	/**
	 * Creates a new BidProduct entity.
	 *
	 * @Route("/new", name="bidproduct_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$bidProduct = new BidProduct();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BidProductType', $bidProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bidProduct);
			$em->flush();

			return $this->redirectToRoute('bidproduct_show', array('id' => $bidProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:BidProduct:new.html.twig', array(
			'bidProduct' => $bidProduct,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a BidProduct entity.
	 *
	 * @Route("/{id}", name="bidproduct_show")
	 * @Method("GET")
	 */
	public function showAction(BidProduct $bidProduct)
	{
		$deleteForm = $this->createDeleteForm($bidProduct);

		return $this->render('UbidElectricityBundle:BidProduct:show.html.twig', array(
			'bidProduct' => $bidProduct,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing BidProduct entity.
	 *
	 * @Route("/{id}/edit", name="bidproduct_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, BidProduct $bidProduct)
	{
		$deleteForm = $this->createDeleteForm($bidProduct);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BidProductType', $bidProduct);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bidProduct);
			$em->flush();

			return $this->redirectToRoute('bidproduct_edit', array('id' => $bidProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:BidProduct:edit.html.twig', array(
			'bidProduct' => $bidProduct,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a BidProduct entity.
	 *
	 * @Route("/{id}", name="bidproduct_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, BidProduct $bidProduct)
	{
		$form = $this->createDeleteForm($bidProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($bidProduct);
			$em->flush();
		}

		return $this->redirectToRoute('bidproduct_index');
	}

	/**
	 * Creates a form to delete a BidProduct entity.
	 *
	 * @param BidProduct $bidProduct The BidProduct entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(BidProduct $bidProduct)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('bidproduct_delete', array('id' => $bidProduct->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
