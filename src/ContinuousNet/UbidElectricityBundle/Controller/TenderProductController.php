<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderProduct;
use ContinuousNet\UbidElectricityBundle\Form\TenderProductType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Tender Product Controller
 * 
 * Manage TenderProducts 
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
 * @see		TenderProductController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/tenderproduct")
 */
class TenderProductController extends BaseController
{
	/**
	 * Lists all TenderProduct entities.
	 *
	 * @Route("/", name="tenderproduct_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$tenderProducts = $em->getRepository('UbidElectricityBundle:TenderProduct')->findAll();

		return $this->render('UbidElectricityBundle:TenderProduct:index.html.twig', array(
			'tenderProducts' => $tenderProducts,
		));
	}

	/**
	 * Creates a new TenderProduct entity.
	 *
	 * @Route("/new", name="tenderproduct_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$tenderProduct = new TenderProduct();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderProductType', $tenderProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderProduct);
			$em->flush();

			return $this->redirectToRoute('tenderproduct_show', array('id' => $tenderProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderProduct:new.html.twig', array(
			'tenderProduct' => $tenderProduct,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TenderProduct entity.
	 *
	 * @Route("/{id}", name="tenderproduct_show")
	 * @Method("GET")
	 */
	public function showAction(TenderProduct $tenderProduct)
	{
		$deleteForm = $this->createDeleteForm($tenderProduct);

		return $this->render('UbidElectricityBundle:TenderProduct:show.html.twig', array(
			'tenderProduct' => $tenderProduct,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TenderProduct entity.
	 *
	 * @Route("/{id}/edit", name="tenderproduct_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TenderProduct $tenderProduct)
	{
		$deleteForm = $this->createDeleteForm($tenderProduct);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderProductType', $tenderProduct);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderProduct);
			$em->flush();

			return $this->redirectToRoute('tenderproduct_edit', array('id' => $tenderProduct->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderProduct:edit.html.twig', array(
			'tenderProduct' => $tenderProduct,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TenderProduct entity.
	 *
	 * @Route("/{id}", name="tenderproduct_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TenderProduct $tenderProduct)
	{
		$form = $this->createDeleteForm($tenderProduct);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($tenderProduct);
			$em->flush();
		}

		return $this->redirectToRoute('tenderproduct_index');
	}

	/**
	 * Creates a form to delete a TenderProduct entity.
	 *
	 * @param TenderProduct $tenderProduct The TenderProduct entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TenderProduct $tenderProduct)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('tenderproduct_delete', array('id' => $tenderProduct->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
