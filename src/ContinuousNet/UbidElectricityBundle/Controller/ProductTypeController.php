<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\ProductType;
use ContinuousNet\UbidElectricityBundle\Form\ProductTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Product Type Controller
 * 
 * Manage ProductTypes 
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
 * @see		ProductTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/producttype")
 */
class ProductTypeController extends BaseController
{
	/**
	 * Lists all ProductType entities.
	 *
	 * @Route("/", name="producttype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$productTypes = $em->getRepository('UbidElectricityBundle:ProductType')->findAll();

		return $this->render('UbidElectricityBundle:ProductType:index.html.twig', array(
			'productTypes' => $productTypes,
		));
	}

	/**
	 * Creates a new ProductType entity.
	 *
	 * @Route("/new", name="producttype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$productType = new ProductType();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\ProductTypeType', $productType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($productType);
			$em->flush();

			return $this->redirectToRoute('producttype_show', array('id' => $productType->getId()));
		}

		return $this->render('UbidElectricityBundle:ProductType:new.html.twig', array(
			'productType' => $productType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a ProductType entity.
	 *
	 * @Route("/{id}", name="producttype_show")
	 * @Method("GET")
	 */
	public function showAction(ProductType $productType)
	{
		$deleteForm = $this->createDeleteForm($productType);

		return $this->render('UbidElectricityBundle:ProductType:show.html.twig', array(
			'productType' => $productType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing ProductType entity.
	 *
	 * @Route("/{id}/edit", name="producttype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, ProductType $productType)
	{
		$deleteForm = $this->createDeleteForm($productType);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\ProductTypeType', $productType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($productType);
			$em->flush();

			return $this->redirectToRoute('producttype_edit', array('id' => $productType->getId()));
		}

		return $this->render('UbidElectricityBundle:ProductType:edit.html.twig', array(
			'productType' => $productType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a ProductType entity.
	 *
	 * @Route("/{id}", name="producttype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, ProductType $productType)
	{
		$form = $this->createDeleteForm($productType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($productType);
			$em->flush();
		}

		return $this->redirectToRoute('producttype_index');
	}

	/**
	 * Creates a form to delete a ProductType entity.
	 *
	 * @param ProductType $productType The ProductType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(ProductType $productType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('producttype_delete', array('id' => $productType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
